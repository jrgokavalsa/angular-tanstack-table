import {
  Directive,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';

@Directive({ selector: '[flexRender]', standalone: true })
export class FlexRenderDirective<TProps extends Object> implements OnInit {
  flexRender = input.required<any>();
  flexRenderProps = input.required<TProps>();

  #viewContainer = inject(ViewContainerRef);
  #templateRef = inject(TemplateRef<any>);

  ngOnInit(): void {
    this.renderComponent();
  }

  private renderComponent(): EmbeddedViewRef<any> | null {
    this.#viewContainer.clear();
    if (!this.flexRender()) {
      return null;
    }

    if (typeof this.flexRender() === 'string') {
      return this.#viewContainer.createEmbeddedView(this.#templateRef, {
        $implicit: this.flexRender(),
      });
    }
    if (typeof this.flexRender() === 'function') {
      const componentInstance = this.flexRender()(this.flexRenderProps());
      return this.#viewContainer.createEmbeddedView(this.#templateRef, {
        $implicit: componentInstance,
      });
    }

    return null;
  }
}
