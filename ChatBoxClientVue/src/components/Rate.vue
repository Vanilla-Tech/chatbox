<template>
  <div class="rate-wrapper text-center">
    <h5>Please rate this chat</h5>
    <div class="rate-submit">
        <button class="btn rate-it" @click="submit">Rate</button>
      </div>
    <div class="rate">
      <input type="radio" id="star5" name="rate" value="5" v-model="rate" />
      <label for="star5" title="5 stars"></label>
      <input type="radio" id="star4" name="rate" value="4" v-model="rate" />
      <label for="star4" title="4 stars"></label>
      <input type="radio" id="star3" name="rate" value="3" v-model="rate" />
      <label for="star3" title="3 stars"></label>
      <input type="radio" id="star2" name="rate" value="2" v-model="rate" />
      <label for="star2" title="2 stars"></label>
      <input type="radio" id="star1" name="rate" value="1" v-model="rate" />
      <label for="star1" title="1 star"></label>
      
    </div>
    
  </div>
</template>
<script>
import constant from "../shared/constant";
export default {
  name: "rate",
  props: ["customerSessionId"],
  data() {
    return {
      rate: null
    };
  },
  methods: {
    submit() {
      let self = this;
      if (self.rate == null) {
        self.rate = 0;
      }
      self.$socket.emit(constant.socketaction.RATECHAT, {
        customerSessionId: self.customerSessionId,
        rating: self.rate
      });
      self.rate = null;
      self.$emit("onResetChat", false);
    }
  }
};
</script>


