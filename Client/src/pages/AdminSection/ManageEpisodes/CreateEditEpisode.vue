<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">
          <span class="pr-1">
            <span v-if="data.id">Edit</span>
            <span v-else>Add</span>
          </span>
          Episode
        </h4>
        <form @submit="submitFormListener" dir="ltr">
          <div>
            <div class="row py-4">
              <div class="col-md-3">
                <base-input
                  label="Episode Name"
                  placeholder="Episode Name"
                  :error="fieldErrors.title"
                  v-model="data.title"
                ></base-input>
              </div>
              <div class="col-md-2">
                <base-input
                  label="Video Length"
                  placeholder="Length"
                  :error="fieldErrors.time"
                  v-model="data.time"
                ></base-input>
              </div>
              <div class="col-md-2">
                <base-input
                  label="Unit No."
                  placeholder="No."
                  :error="fieldErrors.number"
                  v-model="data.number"
                ></base-input>
              </div>
              <div class="col-md-5">
                <base-input
                  label="Video Link"
                  placeholder="Video Link"
                  :error="fieldErrors.videoUrl"
                  v-model="data.videoUrl"
                ></base-input>
              </div>
              <div class="col-md-12 py-3">
                <label class="w-100">Unit Description</label>
                <base-input
                  placeholder="Unit Description"
                  v-model="data.body"
                  :error="fieldErrors.body"
                >
                  <ckeditor
                    :editor="ckeditor.editor"
                    v-model="data.body"
                    :config="ckeditor.editorConfig"
                    @ready="onReady"
                  ></ckeditor>
                </base-input>
              </div>
              <div class="col-md-4">
                <label class="w-100">Unit Type</label>
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Unit Type"
                  v-model="data.type"
                  :error="fieldErrors.type"
                >
                  <el-option
                    v-for="option in selects.CourseType"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-5">
                <div class="form-group has-label">
                  <label class="w-100">Related Course</label>
                  <autocomplete
                    source="/api/v1/admin/courses?filter="
                    results-property="docs"
                    :initialValue="data.course"
                    :initialDisplay="data.courseName"
                    resultsDisplay="title"
                    v-model="data.course"
                    :placeholder="
                      data.courseName || 'Related Course - Search...'
                    "
                    @selected="onSelectCourse"
                    input-class="form-control"
                  ></autocomplete>
                </div>
              </div>
            </div>
            <div class="col-md-12 pt-5" v-if="formErrors.length">
              <div class="text-right text-rtl">
                <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
                <ul>
                  <li v-for="(error, key) in formErrors" :key="key">
                    {{ error }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="mt-5 pull-right">
              <base-button
                class="px-5"
                native-type="submit"
                type="primary"
                :loading="loading"
              >
                <span v-if="data.id">Edit</span>
                <span v-else>Create</span>
                <span class="ml-1">Episode</span>
              </base-button>
              <base-button
                class="px-5 ml-1"
                native-type="button"
                @click="reset"
                type="default"
                v-if="data.id"
                >reset</base-button
              >
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import Autocomplete from 'vuejs-auto-complete';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
import CodePlugin from '@ckeditor/ckeditor5-basic-styles/src/code';
import StrikethroughPlugin from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import SubscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import SuperscriptPlugin from '@ckeditor/ckeditor5-basic-styles/src/superscript';
import UnderlinePlugin from '@ckeditor/ckeditor5-basic-styles/src/underline';
import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Font from '@ckeditor/ckeditor5-font/src/font';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Direction from 'ckeditor5-direction/src/direction';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import backend from '../../../backend';

export default {
  props: [
    'id',
    'title',
    'time',
    'number',
    'videoUrl',
    'body',
    'type',
    'course',
  ],
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    Autocomplete,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      ckeditor: {
        editor: ClassicEditor,
        editorConfig: {
          plugins: [
            Alignment,
            EssentialsPlugin,
            BoldPlugin,
            ItalicPlugin,
            CodePlugin,
            StrikethroughPlugin,
            SubscriptPlugin,
            SuperscriptPlugin,
            UnderlinePlugin,
            LinkPlugin,
            ParagraphPlugin,
            Heading,
            Font,
            PasteFromOffice,
            Indent,
            IndentBlock,
            HeadingButtonsUI,
            ParagraphButtonUI,
            Direction,
          ],

          link: {
            addTargetToExternalLinks: true,
          },

          fontSize: {
            options: [9, 11, 13, 'default', 17, 19, 21],
          },

          fontColor: {
            colors: [
              {
                color: 'hsl(0, 0%, 0%)',
                label: 'Black',
              },
              {
                color: 'hsl(0, 0%, 30%)',
                label: 'Dim grey',
              },
              {
                color: 'hsl(0, 0%, 60%)',
                label: 'Grey',
              },
              {
                color: 'hsl(0, 0%, 100%)',
                label: 'White',
                // hasBorder: true
              },
              {
                color: '#e14eca',
                label: 'Custom 1',
              },
              {
                color: '#00f2c3',
                label: 'Custom 2',
              },
              {
                color: '#1d8cf8',
                label: 'Custom 3',
              },
              {
                color: '#ff8d72',
                label: 'Custom 4',
              },
              {
                color: '#fd5d93',
                label: 'Custom 5',
              },
              {
                color: '#42b883',
                label: 'Custom 6',
              },
              // ...
            ],
          },

          fontBackgroundColor: {
            colors: [
              {
                color: 'hsl(0, 75%, 60%)',
                label: 'Red',
              },
              {
                color: 'hsl(30, 75%, 60%)',
                label: 'Orangeee',
              },
              {
                color: '#e14eca',
                label: 'Custom 1',
              },
              {
                color: '#00f2c3',
                label: 'Custom 2',
              },
              {
                color: '#1d8cf8',
                label: 'Custom 3',
              },
              {
                color: '#ff8d72',
                label: 'Custom 4',
              },
              {
                color: '#fd5d93',
                label: 'Custom 5',
              },
              {
                color: '#42b883',
                label: 'Custom 6',
              },
            ],
          },
          toolbar: [
            'heading',
            '|',
            'outdent',
            'indent',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'code',
            'subscript',
            'superscript',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'direction:ltr',
            'direction:rtl',
            'alignment',
            'undo',
            'redo',
            'fontSize',
            'fontColor',
            'fontBackgroundColor',
          ],
        },
      },
      selects: {
        CourseType: [
          { value: 'Paid', label: 'Paid' },
          { value: 'VIP', label: 'VIP' },
          { value: 'Free', label: 'Free' },
        ],
      },
      data: {
        id: undefined,
        title: '',
        time: '00:00:00',
        number: 1,
        videoUrl: '',
        body: '',
        type: '',
        course: '',
        courseName: '',
      },
      fieldErrors: {},
      formErrors: {},
      loading: false,
    };
  },
  methods: {
    submitFormListener(e) {
      e.preventDefault();
      let haveError = false;
      if (!this.data.title) {
        this.fieldErrors.title = 'نام درس مورد نیاز است.';
        haveError = true;
      }
      if (!this.data.time || this.data.time <= 0) {
        this.fieldErrors.time = 'مدت زمان درس مورد نیاز است.';
        haveError = true;
      }
      if (!this.data.number || this.data.number <= 0) {
        this.fieldErrors.number = 'شماره درس مورد نیاز است.';
        haveError = true;
      }
      if (!this.data.videoUrl) {
        this.fieldErrors.videoUrl = 'آدرس اینترنتی درس مورد نیاز است.';
        haveError = true;
      }
      if (!this.data.body) {
        this.fieldErrors.body = 'توضیحات درس مورد نیاز است.';
        haveError = true;
      }
      if (this.data.time) {
        const matches = this.data.time.match(/^(\d{2})\:(\d{2})\:(\d{2})$/);
        let message = '';
        if (!matches) {
          message = 'طول فیلم را به فرمت HH:MM:SS وارد کنید.';
        } else if (matches[3] > 59) {
          message = 'ثانیه نمیتواند مقداری بیشتراز 59 داشته باشد';
        } else if (matches[2] > 59) {
          message = 'دقیقه نمیتواند مقداری بیشتراز 59 داشته باشد';
        }
        if (message) {
          this.$notify({
            type: 'warning',
            message: message,
            icon: 'tim-icons icon-bell-55',
          });
          haveError = true;
        }
      }
      if (!this.data.type) {
        this.fieldErrors.type = 'نوع درس مورد نیاز است.';
        this.$notify({
          type: 'warning',
          message: 'نوع درس مورد نیاز است.',
          icon: 'tim-icons icon-bell-55',
        });
        haveError = true;
      }
      if (!this.data.course) {
        this.fieldErrors.course = 'دوره درس مورد نیاز است.';
        this.$notify({
          type: 'warning',
          message: 'دوره درس مورد نیاز است.',
          icon: 'tim-icons icon-bell-55',
        });
        haveError = true;
      }
      if (haveError) {
        return;
      }
      this.loading = true;
      const errorHandler = (response) => {
        if (response && response.data && response.data.status === 'error') {
          this.formErrors = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          return;
        }
      };
      const url = this.id
        ? `admin/episodes/${this.id}/edit`
        : `admin/episodes/add`;
      backend
        .post(url, this.data)
        .then((response) => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          this.$notify({
            type: 'success',
            message: this.id
              ? `درس با موفقیت ویرایش شد.`
              : 'درس با موفقیت اضافه شد.',
            icon: 'tim-icons icon-bell-55',
          });
          this.$emit('episode', response.data.episode);
          this.reset();
          window.location.href = '/episodeoverview';
        })
        .catch((err) => {
          this.loading = false;
          errorHandler(err.message);
        });
    },
    onSelectCourse(item) {
      this.data.course = item.value;
      backend
        .post(`/admin/courses/${this.data.course}/insert/episode/number`)
        .then((response) => {
          this.data.number = response.data.number;
        });
    },
    reset() {
      this.data.id = undefined;
      this.data.title = '';
      this.data.time = '00:00:00';
      this.data.number = 1;
      this.data.videoUrl = '';
      this.data.body = '';
      this.data.type = '';
      this.data.course = '';
      this.data.courseName = '';
      this.fieldErrors = {};
      this.formErrors = {};
      this.$emit('reset');
    },
    // onReady(editor) {
    //   console.log('editor', editor);
    //   console.log(editor.plugins);
    // },
  },
  watch: {
    id: function (value) {
      this.formErrors = {};
      this.fieldErrors = {};
      this.data.id = value;
    },
    title: function (value) {
      this.data.title = value;
    },
    time: function (value) {
      this.data.time = value;
    },
    number: function (value) {
      this.data.number = value;
    },
    videoUrl: function (value) {
      this.data.videoUrl = value;
    },
    body: function (value) {
      this.data.body = value;
    },
    type: function (value) {
      this.data.type = value;
    },
    course: function (value) {
      if (value === undefined) {
        this.data.course = '';
        this.data.courseName = '';
      } else {
        this.data.course = value.id;
        this.data.courseName = value.title;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// .autocomplete {
//   background: transparent;
//   .autocomplete__box {
//     background: transparent !important;
//     border-color: #2b3553 !important;
//     border-radius: 0.4285rem !important;
//     font-size: 0.75rem;
//     -webkit-transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
//       background-color 0.3s ease-in-out;
//     transition: color 0.3s ease-in-out, border-color 0.3s ease-in-out,
//       background-color 0.3s ease-in-out;
//   }
//   .autocomplete__results {
//     .autocomplete__results__item {
//       color: #333 !important;
//     }
//   }
// }

/deep/ ::placeholder {
  font-family: Arial, Helvetica, sans-serif !important;
  text-align: left !important;
  color: #919191 !important;
  direction: ltr !important;
}

/deep/ label {
  float: left !important;
  font-size: 0.9rem !important;
}

.ck-editor__editable {
  min-height: 200px;
}
.ck.ck-button {
  width: 29.9px;
  height: 29.9px;
}
// .ck.ck-editor__main > .ck-content  {
// 	background: transparent;
// 	* {
// 		color: #fff;
// 	}
// }
</style>
