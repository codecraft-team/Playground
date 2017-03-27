import {
    Directive, Input,
    ViewContainerRef,
    OnChanges, OnDestroy
} from '@angular/core';

import { PluginService } from './plugin/plugin.service';
import { PluginCreatorService } from './plugin/plugin-creator.service';

@Directive({
    selector: 'plugin-area'
})
export class PluginDirective implements OnChanges, OnDestroy {
    @Input() name: string;

    pluginChangeSubscription: any;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private pluginService: PluginService,
        private creatorService: PluginCreatorService
    ) {
        this.pluginChangeSubscription = this.pluginService.change.subscribe(() => this.init());
    }

    init() {
        if (!this.name) {
            return;
        }
        this.creatorService.initialize(this.name, this.viewContainerRef);
    }

    ngOnChanges() {
        this.init();
    }

    ngOnDestroy() {
        this.pluginChangeSubscription.unsubscribe();
    }
}