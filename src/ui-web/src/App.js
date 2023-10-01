import { html } from 'lit-html'
import styles from './App.module.css'
import { Component } from './Component.js'
import './Header.js'
import './Content.js'

class App extends Component {
  getHtml() {
    return html`
      <div class=${styles.container}>
        <app-header></app-header>
        <app-content class=${styles.content}></app-content>
      </div>
    `
  }
}

customElements.define('app-falukollen', App)
