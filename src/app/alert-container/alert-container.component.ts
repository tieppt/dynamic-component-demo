import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { AlertContentComponent } from '../alert-content/alert-content.component';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert-container',
  templateUrl: './alert-container.component.html',
  styleUrls: ['./alert-container.component.scss']
})
export class AlertContainerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('container', {
    read: ViewContainerRef,
    static: true
  }) container: ViewContainerRef;

  componentRef: ComponentRef<AlertContentComponent>;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.close$.subscribe(
      () => {
        this.container.clear();

        if (this.componentRef) {
          this.componentRef.destroy();
        }
      }
    );
    this.renderComponent();
  }
  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  renderComponent() {
    const container = this.container;
    container.clear();
    const injector = container.injector;

    const cfr: ComponentFactoryResolver = injector.get(ComponentFactoryResolver);
    const componentFactory = cfr.resolveComponentFactory(AlertContentComponent);
    // const componentRef = container.createComponent(componentFactory, container.length, injector);
    const componentRef = container.createComponent(componentFactory, 0, injector);
    componentRef.instance.data = 'Message from container';
    // componentRef.changeDetectorRef.detectChanges();
    this.componentRef = componentRef;
  }

}
