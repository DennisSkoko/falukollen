import { html } from 'lit-html'
import styles from './Header.module.css'
import { Component } from './Component.js'

class Header extends Component {
  getHtml() {
    return html`
      <header>
        <h1 class=${styles.title}>Falukollen</h1>
      </header>
    `
  }
}

customElements.define('app-header', Header)
