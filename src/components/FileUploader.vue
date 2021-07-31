<template>
  <div class="mb-10">
    <h2>File Uploader</h2>
    <div class="w-full max-w-7xl mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 border">
        <div class="flex w-full items-center justify-center text-center" id="app">
          <div class="p-32 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <input type="file" multiple name="fields" id="assetsFieldHandle"
                   class="w-px h-px opacity-0 overflow-hidden absolute" ref="fileInput" @change="onChangeInput" />
            <label for="assetsFieldHandle" class="block cursor-pointer">
              <span><span class="font-black">Choose a files</span> or drag it here</span>
            </label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
const JSZip = require('jszip')

@Component({
})

export default class FileUploader extends Vue {
  public fileList: Array<object> = []

  $refs!: {
    fileInput: HTMLFormElement
  }

  public onChangeInput () {
    if (!this.$refs.fileInput.files) return
    this.fileList = [...this.$refs.fileInput.files]
    this.generateZip()
  }

  public async generateZip () {
    const zip = new JSZip()

    await this.fileList.map(function (file: any):void {
      zip.file(file.name, file)
    })

    zip.generateAsync({
      type: 'base64'
    }).then(function (content: any) {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.classList.add('hidden')
      a.href = 'data:application/zip;base64,' + content
      a.download = 'test.zip'
      a.click()
    })
  }

  public dragover (event: any): void {
    event.preventDefault()
    if (!event.currentTarget.classList.contains('bg-green-300')) {
      event.currentTarget.classList.remove('bg-gray-100')
      event.currentTarget.classList.add('bg-green-300')
    }
  }

  public dragleave (event: any): void {
    event.currentTarget.classList.add('bg-gray-100')
    event.currentTarget.classList.remove('bg-green-300')
  }

  public drop (event: any): void {
    this.fileList = []
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    if (!droppedFiles) return;
    ([...droppedFiles]).forEach(file => {
      this.fileList.push(file)
    })
    this.generateZip()
    event.currentTarget.classList.add('bg-gray-100')
    event.currentTarget.classList.remove('bg-green-300')
  }
}
</script>
