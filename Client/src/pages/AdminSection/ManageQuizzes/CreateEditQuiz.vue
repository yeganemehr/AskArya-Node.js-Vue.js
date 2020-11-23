<template>
  <div class="mt-5">
    <div class="card p-4">
      <b-form dir="ltr">
        <div class="row">
          <div class="col-md-4">
            <b-form-group label="Quiz Name">
              <b-form-input required placeholder="Quiz Name"></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-4">
            <b-form-group label="Related Course">
              <b-form-input
                required
                placeholder="Related Course..."
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-2">
            <b-form-group label="Retakes Allowed">
              <b-form-input
                required
                placeholder="Number of Retakes..."
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-2">
            <b-form-group label="No. of Questions">
              <b-form-input
                required
                placeholder="No. of Questions"
              ></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-2">
            <b-form-group label="Time Limit (Mins)">
              <b-form-input required placeholder="Quiz Time"></b-form-input>
            </b-form-group>
          </div>

          <div class="col-md-2">
            <b-form-group label="Pass Mark (%)">
              <b-form-input required placeholder="Pass Mark"></b-form-input>
            </b-form-group>
          </div>

          <div class="col-12 mb-5"><hr /></div>

          <!-- Question 1  -->
          <div class="row px-3">
            <div class="col-md-8">
              <b-form-group label="Question: 1 /10">
                <b-form-textarea
                  required
                  placeholder="Enter question here..."
                ></b-form-textarea>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group label="Question Hint (optional)">
                <b-form-textarea
                  required
                  placeholder="Enter question hint here..."
                ></b-form-textarea>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group label="Media link (optional)">
                <b-form-input
                  required
                  placeholder="Video/Audio/Image url..."
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <b-form-group label="Question ID">
                <b-form-input required placeholder="Question ID"></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <b-form-group label="Points Available">
                <b-form-input
                  required
                  placeholder="Points Available"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-12 py-3">
              <div class="row">
                <div class="col-md-6">
                  <b-input-group prepend="1" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 1"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="2" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 2"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="3" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 3"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="4" class="mb-4">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 4"
                    ></b-form-input>
                  </b-input-group>
                </div>
              </div>

              <b-form-group label="Correct Answer">
                <b-form-radio-group
                  v-model="selected"
                  :options="options"
                  plain
                  name="Correct Answer"
                ></b-form-radio-group>
              </b-form-group>

              <div class="mt-3 text-right">
                <b-button-group size="sm">
                  <b-button variant="success">Save</b-button>
                  <b-button variant="warning">Edit</b-button>
                  <b-button variant="danger">Delete</b-button>
                </b-button-group>
              </div>
            </div>
          </div>

          <div class="col-md-12 py-4">
            <hr />
          </div>

          <!-- Question 2 -->
          <div class="row px-3">
            <div class="col-md-8">
              <b-form-group label="Question: 2 /10">
                <b-form-textarea
                  required
                  placeholder="Enter question here..."
                ></b-form-textarea>
              </b-form-group>
            </div>

            <div class="col-md-4">
              <b-form-group label="Question Hint (optional)">
                <b-form-textarea
                  required
                  placeholder="Enter question hint here..."
                ></b-form-textarea>
              </b-form-group>
            </div>

            <div class="col-md-6">
              <b-form-group label="Media link (optional)">
                <b-form-input
                  required
                  placeholder="Video/Audio/Image url..."
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <b-form-group label="Question ID ">
                <b-form-input required placeholder="Question ID"></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-3">
              <b-form-group label="Points Available">
                <b-form-input
                  required
                  placeholder="Points Available"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="col-md-12 py-3">
              <div class="row">
                <div class="col-md-6">
                  <b-input-group prepend="1" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 1"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="2" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 2"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="3" class="mb-2">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 3"
                    ></b-form-input>
                  </b-input-group>
                </div>

                <div class="col-md-6">
                  <b-input-group prepend="4" class="mb-4">
                    <b-form-input
                      id="inline-form-input-username"
                      placeholder="Answer 4"
                    ></b-form-input>
                  </b-input-group>
                </div>
              </div>

              <b-form-group label="Correct Answer">
                <b-form-radio-group
                  v-model="selected"
                  :options="options"
                  plain
                  name="Correct Answer"
                ></b-form-radio-group>
              </b-form-group>

              <div class="mt-3 text-right">
                <b-button-group size="sm">
                  <b-button variant="success">Save</b-button>
                  <b-button variant="warning">Edit</b-button>
                  <b-button variant="danger">Delete</b-button>
                </b-button-group>
              </div>
              <hr />
            </div>
          </div>
        </div>

        <div class="mt-5">
          <b-button class="mr-2" type="submit" variant="primary"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        name: '',
        food: null,
        checked: [],
      },

      options: [
        { text: '1', value: 'first' },
        { text: '2', value: 'second' },
        { text: '3', value: 'third' },
        { text: '4', value: 'fourth' },
      ],

      show: true,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = '';
      this.form.name = '';
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ ::placeholder {
  text-align: left !important;
  direction: ltr !important;
}

hr {
  border: 1px dashed #afafaf !important;
}
</style>
