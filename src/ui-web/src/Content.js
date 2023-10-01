import { html } from 'lit-html'
import { getProducts } from './api.js'
import { Component } from './Component.js'
import styles from './Content.module.css'
import './SausageListItem.js'

class Content extends Component {
  constructor() {
    super()
    this.fetchData()
  }

  async fetchData() {
    this.data = await getProducts()
    this.update()
  }

  getHtml() {
    return html`
      <main>
        ${this.data && html`
          <ul class=${styles.list}>
            ${this.data.sausages.map(sausage => html`
              <li class=${styles.item}>
                <app-sausage-list-item .sausage=${sausage}></app-sausage-list-item>
              </li>
            `)}
          </ul>
        `}
      </main>
    `
  }
}

customElements.define('app-content', Content)
