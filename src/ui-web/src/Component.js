import { render } from 'lit-html'

export class Component extends HTMLElement {
  getHtml() {
    throw new Error('Not implemented')
  }

  connectedCallback() {
    this.update()
  }

  update() {
    render(this.getHtml(), this)
  }
}
