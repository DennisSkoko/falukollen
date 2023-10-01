import { html } from 'lit-html'
import { Component } from './Component.js'
import styles from './SausageListItem.module.css'

function getPriceTypeLabel(priceType) {
  switch (priceType) {
    case 'piece':
      return 'kr/st'
    case 'per-kg':
      return 'kr/kg'
    default:
      return 'kr'
  }
}

class SausageListItem extends Component {
  getHtml() {
    const inner = html`
      <h2 class=${styles.header}>${this.sausage.brand} - ${this.sausage.name}</h2>
      <div class=${styles.desc}>
        <p>${this.sausage.price.valuePerKg.toLocaleString()} kr/kg</p>
        <p>
          ${this.sausage.price.value.toLocaleString()} ${getPriceTypeLabel(this.sausage.price.type)}
          |
          ${this.sausage.weight.toLocaleString()}g
        </p>
      </div>
    `

    return this.sausage.url
      ? html`
        <a class=${styles.card} href=${this.sausage.url} target="_blank" rel="noopener">${inner}</a>
      `
      : html`
        <section class=${styles.card}>${inner}</section>
      `
  }
}

customElements.define('app-sausage-list-item', SausageListItem)
