import { ElementConfig } from './types';
import { DEFAULT_BUFF_INNER_OVERLAY_HTML } from './constants';

export const applyStyle = (styles: string): void => {
  /* 
  const styles = `
            .test-class { 
                color: #ff8100;
            }
        `; 
  */

  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
};

export const wrapElement = (el: Element, newElementConfig: ElementConfig): void => {
  const elementType = newElementConfig.type || 'div';
  const attributeClass = newElementConfig.class || null;

  const wrapper = document.createElement(elementType);
  if (attributeClass) {
    wrapper.setAttribute('class', attributeClass);
  }

  if (el.parentNode) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
};

export const injectBuffOverlay = (elementConfig: ElementConfig): void => {
  const position = 'beforeend';

  document
    .querySelector(`${elementConfig.type}.${elementConfig.class}`)
    ?.insertAdjacentHTML(position, DEFAULT_BUFF_INNER_OVERLAY_HTML);
};
