<template>
  <div class="mb-10">
    <h2>File Uploader</h2>
    <div class="w-full max-w-7xl mx-auto">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 border">
        <div class="flex w-full items-center justify-center text-center" id="app">
          <div class="p-32 bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave" @drop="drop">
            <input type="file" multiple name="fields" id="assetsFieldHandle"
                   class="w-px h-px opacity-0 overflow-hidden absolute" ref="fileInput" @change="onChange" accept=".pdf,.jpg,.jpeg,.png" />
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

  public onChange (): void {
    const zip = new JSZip()
    this.fileList.map((file: any) => {
      zip.file(file.name, file)
    })
    zip.generateAsync({ type: 'blob' }).then(function (blob: Blob) {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.classList.add('hidden')
      const url = window.URL.createObjectURL(blob)
      a.href = url
      a.download = 'test.zip'
      a.click()
      window.URL.revokeObjectURL(url)
    }, (err: any) => {
      console.log(err)
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
    event.preventDefault()
    this.onChange()
    event.currentTarget.classList.add('bg-gray-100')
    event.currentTarget.classList.remove('bg-green-300')
  }
}
</script>
