const controller = require("app/http/controllers/api/controller");
const Course = require("app/models/course");
const Episode = require("app/models/episode");
const Comment = require("app/models/comment");
const passport = require("passport");
const request = require("request");

class courseController extends controller {
	async courses(req, res, next) {
		try {
			const page = req.query.page || 1;
			const promises = [];
			promises.push(
				Course.paginate(
					{},
					{
						page,
						sort: {
							createdAt: 1
						},
						limit: 12,
						populate: [{ path: "categories" }, { path: "user" }, { path: 'episodesCount' }],
					}
				)
			);
			promises.push(Episode.find({}, "time").exec());
			const results = await Promise.all(promises);
			const courses = results[0];
			const episodes = results[1];
			let seconds = 0;
			for (const episode of episodes) {
				const time = episode.time.split(":", 3);
				for (let x = 0; x < time.length; x++) {
					seconds += parseInt(time[x]) * Math.pow(60, time.length - x - 1);
				}
			}
			const data = {
				...courses,
				docs: courses.docs.map(this.filterCourse),
				episodes: episodes.length,
				seconds
			};
			res.json(data);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterCourse(course) {
		return {
			id: course.id,
			title: course.title,
			slug: course.slug,
			body: course.body,
			thumb: course.thumb,
			type: course.type,
			categories: course.categories.map(cate => {
				return {
					name: cate.name,
					slug: cate.slug
				};
			}),
			user: {
				id: course.user.id,
				name: course.user.name
			},
			price: course.price,
			createdAt: course.createdAt,
			time: course.time,
			episodes: course.episodesCount,
		};
	}

	async singleCourse(req, res) {
		try {
			const course = await Course.findOneAndUpdate({ slug: req.params.slug }, {
				$inc: { viewCount: 1 }
			}).populate([
				{
					path: "user",
					select: "name"
				},
				{
					path: "episodes",
					options: { sort: { number: 1 } }
				},
				{
					path: "categories",
					select: "name slug"
				},
				{
					path: "usersCount",
				}
			]);

			if (!course) return this.failed("چنین دوره ای یافت نشد", res, 404);
			passport.authenticate("jwt", { session: true }, (err, user, info) => {
				res.json({
					data: {
						course: this.filterCourseData(course, user),
						enrolled: user ? user.checkLearning(course.id) : false,
						enrolledCount: course.usersCount,
					},
					status: "success"
				});
			})(req, res);
		} catch (err) {
			this.failed(err.message, res);
		}
	}

	filterCourseData(course, user) {
		return {
			id: course.id,
			title: course.title,
			slug: course.slug,
			body: course.body,
			image: course.thumb,
			type: course.type,
			time: course.time,
			categories: course.categories.map(cate => {
				return {
					name: cate.name,
					slug: cate.slug
				};
			}),
			user: {
				id: course.user.id,
				name: course.user.name
			},
			episodes: course.episodes.map(episode => {
				return this.filterEpisodeData(episode, user);
			}),
			price: course.price,
			createdAt: course.createdAt
		};
	}
	filterEpisodeData(episode, user) {
		return {
			time: episode.time,
			downloadCount: episode.downloadCount,
			viewCount: episode.viewCount,
			commentCount: episode.commentCount,
			id: episode.id,
			title: episode.title,
			body: episode.body,
			type: episode.type,
			number: episode.number,
			createdAt: episode.createdAt,
			download: episode.download(!! user, user)
		}
	}
	async singleEpisode(req, res) {
		try {
			const episode = await Episode.findByIdAndUpdate(req.params.id, {
				$inc: { viewCount: 1 },
			}).populate([
				{
					path: "course",
					populate: [
						{
							path: "user",
							select: "name"
						},
						{
							path: "episodes",
							match: { id: { $ne: req.params.id } },
							options: { sort: { number: 1 } }
						},
						{
							path: "categories",
							select: "name slug"
						},
						{
							path: "usersCount",
						},
					],
				},
			]);
			if (! episode) return this.failed("چنین درسی یافت نشد", res, 404);
			for (const key in episode.course.episodes) {
				if (episode.course.episodes[key] == undefined) continue;
				if (episode.course.episodes[key].id == episode.id) {
					episode.course.episodes.splice(key, 1);
					break;
				}
			}
			passport.authenticate("jwt", { session: true }, (err, user, info) => {
				res.json({
					data: {
						episode: this.filterEpisodeData(episode, user),
						course: this.filterCourseData(episode.course, user),
						enrolled: user ? user.checkLearning(episode.course.id) : false,
						enrolledCount: episode.course.usersCount,
					},
					status: "success"
				});
			})(req, res);
		} catch (err) {
			this.failed(err.message, res);
		}
	}
	async downloadEpisode(req, res) {
		const mac = req.query.mac;
		const t = req.query.t;
		if (! mac || ! t || new Date() >= t) {
			return this.failed("چنین درسی یافت نشد", res, 404);
		}
		const episode = await Episode.findById(req.params.id);
		if (! episode || ! episode.validateDownload(mac, t)) {
			return this.failed("چنین درسی یافت نشد", res, 404);
		}
		const reqo = request(episode.videoUrl);
		req.pipe(reqo);
		reqo.pipe(res);
	}
	async commentForSingleCourse(req, res) {
		try {
			let comments = await Comment.find({
				course: req.params.course,
				parent: null,
				approved: true
			}).populate([
				{
					path: "user",
					select: "name"
				},
				{
					path: "comments",
					match: {
						approved: true
					},
					populate: { path: "user", select: "name" }
				}
			]);
			return res.json(comments);
		} catch (err) {
			this.failed(err.message, res);
		}
	}
}

module.exports = new courseController();
