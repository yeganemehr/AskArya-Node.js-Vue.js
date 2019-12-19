const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uniqueString = require('unique-string');
const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: 0
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  rememberToken: {
    type: String,
    default: null
  },
  avatar: {
    type: String,
    default: null
  },
  vipTime: {
    type: Date,
    default: new Date().toISOString()
  },
  vipFrom: {
    type: Date,
    default: new Date().toISOString()
  },
  lang: {
    type: String,
    default: 'en'
  },
  learning: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }],
  xp: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});

userSchema.plugin(mongoosePaginate);

userSchema.pre('remove', async function (next) {

  //delete tickets
  const tickets = await this.model('Ticket').find({ user: this._id });
  for (let i = 0; i < tickets.length; i++) {
    const t = tickets[i];
    await t.remove();

  }

  //delete doneEpisodes
  const doneEpisodes = await this.model('DoneEpisode').find({ user: this._id });

  for (let i = 0; i < doneEpisodes.length; i++) {
    const de = doneEpisodes[i];
    await de.remove();
  }

  //delete activationCodes
  const activationCodes = await this.model('ActivationCode').find({ user: this._id });
  for (let i = 0; i < activationCodes.length; i++) {
    const ac = activationCodes[i];
    await ac.remove();
  }

  //delete Courses
  const courses = await this.model('Course').find({ user: this._id });
  for (let i = 0; i < courses.length; i++) {
    const element = courses[i];
    await element.remove();
  }

  //delete Learnings
  const learnings = await this.model('Learning').find({ user: this._id });
  for (let i = 0; i < learnings.length; i++) {
    const element = learnings[i];
    await element.remove();
  }

  next();
})
userSchema.pre('save', function (next) {
  if (this.isModified("password")) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.password, salt);

    this.password = hash;
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  if (this.getUpdate().$set.password) {
    let salt = bcrypt.genSaltSync(15);
    let hash = bcrypt.hashSync(this.getUpdate().$set.password, salt);

    this.getUpdate().$set.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.hasRole = function (roles) {
  let result = roles.filter(role => {
    return this.roles.indexOf(role) > -1;
  });

  return !!result.length;
};

userSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie('remember_token', token, {
    maxAge: 1000 * 60 * 60 * 24 * 90,
    httpOnly: true,
    signed: true
  });
  this.updateOne({
    rememberToken: token
  }, err => {
    if (err) console.log(err);
  });
};
userSchema.methods.removeRememberToken = function (res) {
  res.cookie('remember_token', '', {
    maxAge: Date.now(),
    httpOnly: true,
    signed: false
  });
  this.updateOne({
    rememberToken: null
  }, err => {
    if (err) console.log(err);
  });
};

userSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'user'
});

userSchema.methods.isVip = function () {
  return new Date(this.vipTime) > new Date();
};

userSchema.methods.checkLearning = function (courseId) {
  if (typeof courseId == 'object' && courseId instanceof Buffer) {
    courseId = courseId.toString('hex');
  }
  return this.learning.indexOf(courseId) !== -1;
};

module.exports = mongoose.model('User', userSchema);