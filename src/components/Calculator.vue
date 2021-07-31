<template>
  <div class="w-full max-w-xs mx-auto ">
    <h2>Calculator</h2>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numberOne">
          A
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model="calculatorForm.numberOne" id="numberOne" type="number">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="numberTwo">
          B
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" v-model="calculatorForm.numberTwo" id="numberTwo" type="number">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="sum">
          SUM
        </label>
        <input :value="calculatorSum" disabled readonly class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="sum" type="number">
      </div>
      <div class="flex items-center justify-between">
        <button @click="calculateSum" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Click
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Action } from 'vuex-class'

export class calculatorObject {
  numberOne: number | null | undefined;
  numberTwo: number | null | undefined;
}

@Component({
  computed: {
    ...mapGetters({
      calculatorSum: 'calculator/calculatorSum'
    })
  }
})

export default class Calculator extends Vue {
  @Model() calculatorForm: calculatorObject = {
    numberOne: null,
    numberTwo: null
  };

  @Action('calculate')
  calculate!: (calculate: Object) => void

  public calculateSum () {
    if (this.calculatorForm.numberOne && this.calculatorForm.numberTwo) {
      this.calculate(this.calculatorForm)
    }
  }
}
</script>
