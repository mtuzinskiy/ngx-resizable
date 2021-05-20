/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostBinding, Input, ElementRef, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NgxResizeableWindowRef } from '../window.service';
const ɵ0 = window;
export class ResizableComponent {
    /**
     * @param {?} regionElement
     * @param {?} windowRef
     */
    constructor(regionElement, windowRef) {
        this.regionElement = regionElement;
        this.windowRef = windowRef;
        this.resizable = true;
        this.noTransition = false;
        this.rFlex = false;
        this.resizeStart = new EventEmitter();
        this.resizing = new EventEmitter();
        this.resizeEnd = new EventEmitter();
        this.vx = 1;
        this.vy = 1;
        this.info = {};
        this.nativeElement = this.regionElement.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.rFlex) {
            this.resizable = false;
        } // Added to permit use of component for all cells
        this.flexBasis = 'flexBasis' in this.nativeElement.style ? 'flexBasis' :
            'webkitFlexBasis' in this.nativeElement.style ? 'webkitFlexBasis' :
                'msFlexPreferredSize' in this.nativeElement.style ? 'msFlexPreferredSize' : 'flexBasis';
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.style = this.windowRef.nativeWindow.getComputedStyle(this.nativeElement);
    }
    /**
     * @private
     * @param {?} p
     * @return {?}
     */
    updateInfo(p) {
        this.info['width'] = false;
        this.info['height'] = false;
        if (this.axis === 'x') {
            this.info['width'] = parseInt(this.nativeElement.style[this.rFlex ? this.flexBasis : 'width'], 10);
        }
        else {
            this.info['height'] = parseInt(this.nativeElement.style[this.rFlex ? this.flexBasis : 'height'], 10);
        }
        this.info['id'] = this.nativeElement.id;
        this.info['point'] = p;
    }
    /**
     * @param {?} p
     * @param {?} direction
     * @return {?}
     */
    dragStart(p, direction) {
        this.dragDir = direction;
        this.axis = (this.dragDir === 'left' || this.dragDir === 'right') ? 'x' : 'y';
        this.start = (this.axis === 'x' ? p.x : p.y);
        this.w = parseInt(this.style.getPropertyValue('width'), 10);
        this.h = parseInt(this.style.getPropertyValue('height'), 10);
        this.resizeStart.emit({ info: this.info });
        // prevent transition while dragging
        this.noTransition = true;
    }
    /**
     * @param {?} p
     * @return {?}
     */
    dragEnd(p) {
        this.updateInfo(p);
        this.resizeEnd.emit({ info: this.info });
        this.noTransition = false;
    }
    /**
     * @param {?} p
     * @return {?}
     */
    dragging(p) {
        /** @type {?} */
        const offset = (this.axis === 'x') ? this.start - p.x : this.start - p.y;
        /** @type {?} */
        let operand = 1;
        switch (this.dragDir) {
            case 'top':
                operand = -1;
            /* falls through */
            case 'bottom':
                /** @type {?} */
                const height = (this.h - offset * this.vy * operand) + 'px';
                if (this.rFlex) {
                    this.flexBasis = height;
                }
                else {
                    this.height = height;
                }
                break;
            case 'left':
                operand = -1;
            /* falls through */
            case 'right':
                /** @type {?} */
                const width = (this.w - offset * this.vx * operand) + 'px';
                if (this.rFlex) {
                    this.flexBasis = width;
                }
                else {
                    this.width = width;
                }
                break;
        }
        this.updateInfo(p);
        this.resizing.emit({ info: this.info });
    }
}
ResizableComponent.decorators = [
    { type: Component, args: [{
                selector: 'rsz-layout',
                template: "<ng-content></ng-content>\n\n<div *ngFor='let direction of directions'\n     [class]=\"'rg-' + direction\"\n     rszDragHandle\n     (DragStart)=\"dragStart($event, direction);\"\n     (DragEnd)=\"dragEnd($event)\"\n     (Drag)=\"dragging($event)\">\n    <span></span>\n</div>",
                providers: [{ provide: 'Window', useValue: ɵ0 }],
                encapsulation: ViewEncapsulation.None,
                styles: [".content{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column nowrap}.row{-webkit-box-flex:1;flex:1;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row nowrap}.row.resizable{-webkit-box-flex:0;flex:0 0 360px}.cell{box-sizing:border-box;background:#fff;border:4px solid #f0f0f0;-webkit-box-flex:1;flex:1;min-height:60px}.cell.resizable{-webkit-box-flex:0;flex:0 0 360px}.resizable{position:relative}.resizable.no-transition{-webkit-transition:none!important;transition:none!important}.rg-none{display:none}.rg-bottom,.rg-left,.rg-right,.rg-top{display:block;width:8px;height:8px;line-height:8px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;background:0 0;position:absolute;z-index:1}.rg-bottom span,.rg-left span,.rg-right span,.rg-top span{position:absolute;box-sizing:border-box;display:block;border:1px solid #ccc}.rg-left span,.rg-right span{border-width:0 1px;top:50%;margin:-10px 0 0 2px;height:20px;width:4px}.rg-bottom span,.rg-top span{border-width:1px 0;left:50%;margin:2px 0 0 -10px;width:20px;height:4px}.rg-top{cursor:row-resize;width:100%;top:0;left:0;margin-top:-4px}.rg-right{cursor:col-resize;height:100%;right:0;top:0;margin-right:-8px}.rg-bottom{cursor:row-resize;width:100%;bottom:0;left:0;margin-bottom:-4px}.rg-left{cursor:col-resize;height:100%;left:0;top:0;margin-left:-8px}.content.cols{-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-flow:row nowrap}.content.cols .row{-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column nowrap}.content.cols .cell{min-width:60px}.content.cols .rg-top{margin-top:-8px}.content.cols .rg-right{margin-right:-4px}.content.cols .rg-bottom{margin-bottom:-8px}.content.cols .rg-left{margin-left:-4px}"]
            }] }
];
/** @nocollapse */
ResizableComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: NgxResizeableWindowRef }
];
ResizableComponent.propDecorators = {
    resizable: [{ type: HostBinding, args: ['class.resizable',] }],
    noTransition: [{ type: HostBinding, args: ['class.no-transition',] }],
    width: [{ type: HostBinding, args: ['style.width',] }],
    height: [{ type: HostBinding, args: ['style.height',] }],
    flexBasis: [{ type: HostBinding, args: ['style.flex-basis',] }],
    directions: [{ type: Input }],
    rFlex: [{ type: Input }],
    resizeStart: [{ type: Output }],
    resizing: [{ type: Output }],
    resizeEnd: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    ResizableComponent.prototype.resizable;
    /** @type {?} */
    ResizableComponent.prototype.noTransition;
    /** @type {?} */
    ResizableComponent.prototype.width;
    /** @type {?} */
    ResizableComponent.prototype.height;
    /** @type {?} */
    ResizableComponent.prototype.flexBasis;
    /** @type {?} */
    ResizableComponent.prototype.directions;
    /** @type {?} */
    ResizableComponent.prototype.rFlex;
    /** @type {?} */
    ResizableComponent.prototype.resizeStart;
    /** @type {?} */
    ResizableComponent.prototype.resizing;
    /** @type {?} */
    ResizableComponent.prototype.resizeEnd;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.nativeElement;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.style;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.w;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.h;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.vx;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.vy;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.start;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.dragDir;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.axis;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.info;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.regionElement;
    /**
     * @type {?}
     * @private
     */
    ResizableComponent.prototype.windowRef;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXphYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0AzZGdlbm9tZXMvbmd4LXJlc2l6YWJsZS8iLCJzb3VyY2VzIjpbImxpYi9yZXNpemFibGUvcmVzaXphYmxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxXQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUMxSSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztXQU9iLE1BQU07QUFHcEQsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFpQzdCLFlBQW9CLGFBQXlCLEVBQVUsU0FBaUM7UUFBcEUsa0JBQWEsR0FBYixhQUFhLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUF3QjtRQS9CeEQsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNiLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBTWhELFVBQUssR0FBRyxLQUFLLENBQUM7UUFFYixnQkFBVyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDakMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDOUIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFTakMsT0FBRSxHQUFHLENBQUMsQ0FBQztRQUNQLE9BQUUsR0FBRyxDQUFDLENBQUM7UUFRUCxTQUFJLEdBQUcsRUFBRSxDQUFDO1FBR2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDeEQsQ0FBQzs7OztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1NBQUUsQ0FBQyxpREFBaUQ7UUFDOUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLElB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TTtTQUNUO1FBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDOzs7WUFuSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixnU0FBdUM7Z0JBRXZDLFNBQVMsRUFBRSxDQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLElBQVEsRUFBRSxDQUFFO2dCQUN0RCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTs7YUFDdEM7Ozs7WUFWK0MsVUFBVTtZQUNqRCxzQkFBc0I7Ozt3QkFZNUIsV0FBVyxTQUFDLGlCQUFpQjsyQkFDN0IsV0FBVyxTQUFDLHFCQUFxQjtvQkFDakMsV0FBVyxTQUFDLGFBQWE7cUJBQ3pCLFdBQVcsU0FBQyxjQUFjO3dCQUMxQixXQUFXLFNBQUMsa0JBQWtCO3lCQUU5QixLQUFLO29CQUNMLEtBQUs7MEJBRUwsTUFBTTt1QkFDTixNQUFNO3dCQUNOLE1BQU07Ozs7SUFYUCx1Q0FBaUQ7O0lBQ2pELDBDQUF5RDs7SUFDekQsbUNBQWtDOztJQUNsQyxvQ0FBb0M7O0lBQ3BDLHVDQUEyQzs7SUFFM0Msd0NBQW9COztJQUNwQixtQ0FBdUI7O0lBRXZCLHlDQUEyQzs7SUFDM0Msc0NBQXdDOztJQUN4Qyx1Q0FBeUM7Ozs7O0lBRXpDLDJDQUFzQjs7Ozs7SUFFdEIsbUNBQWM7Ozs7O0lBRWQsK0JBQVU7Ozs7O0lBQ1YsK0JBQVU7Ozs7O0lBRVYsZ0NBQWU7Ozs7O0lBQ2YsZ0NBQWU7Ozs7O0lBRWYsbUNBQWM7Ozs7O0lBRWQscUNBQWdCOzs7OztJQUVoQixrQ0FBYTs7Ozs7SUFFYixrQ0FBa0I7Ozs7O0lBRU4sMkNBQWlDOzs7OztJQUFFLHVDQUF5QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBIb3N0QmluZGluZywgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdFbmNhcHN1bGF0aW9uLCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgQWZ0ZXJWaWV3SW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4UmVzaXplYWJsZVdpbmRvd1JlZiB9IGZyb20gJy4uL3dpbmRvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFBvaW50IH0gZnJvbSAnLi9kcmFnLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3Jzei1sYXlvdXQnLFxuICB0ZW1wbGF0ZVVybDogJ3Jlc2l6YWJsZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydyZXNpemFibGUuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogJ1dpbmRvdycsIHVzZVZhbHVlOiB3aW5kb3cgfSBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5yZXNpemFibGUnKSByZXNpemFibGUgPSB0cnVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLm5vLXRyYW5zaXRpb24nKSBub1RyYW5zaXRpb24gPSBmYWxzZTtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIHdpZHRoO1xuICBASG9zdEJpbmRpbmcoJ3N0eWxlLmhlaWdodCcpIGhlaWdodDtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5mbGV4LWJhc2lzJykgZmxleEJhc2lzO1xuXG4gIEBJbnB1dCgpIGRpcmVjdGlvbnM7XG4gIEBJbnB1dCgpIHJGbGV4ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHJlc2l6ZVN0YXJ0ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcmVzaXppbmcgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSByZXNpemVFbmQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBuYXRpdmVFbGVtZW50O1xuXG4gIHByaXZhdGUgc3R5bGU7XG5cbiAgcHJpdmF0ZSB3O1xuICBwcml2YXRlIGg7XG5cbiAgcHJpdmF0ZSB2eCA9IDE7XG4gIHByaXZhdGUgdnkgPSAxO1xuXG4gIHByaXZhdGUgc3RhcnQ7XG5cbiAgcHJpdmF0ZSBkcmFnRGlyO1xuXG4gIHByaXZhdGUgYXhpcztcblxuICBwcml2YXRlIGluZm8gPSB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZ2lvbkVsZW1lbnQ6IEVsZW1lbnRSZWYsIHByaXZhdGUgd2luZG93UmVmOiBOZ3hSZXNpemVhYmxlV2luZG93UmVmKSB7XG4gICAgdGhpcy5uYXRpdmVFbGVtZW50ID0gdGhpcy5yZWdpb25FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuckZsZXgpIHsgdGhpcy5yZXNpemFibGUgPSBmYWxzZTsgfSAvLyBBZGRlZCB0byBwZXJtaXQgdXNlIG9mIGNvbXBvbmVudCBmb3IgYWxsIGNlbGxzXG4gICAgdGhpcy5mbGV4QmFzaXMgPSAnZmxleEJhc2lzJyBpbiB0aGlzLm5hdGl2ZUVsZW1lbnQuc3R5bGUgPyAnZmxleEJhc2lzJyA6XG4gICAgICAnd2Via2l0RmxleEJhc2lzJyBpbiB0aGlzLm5hdGl2ZUVsZW1lbnQuc3R5bGUgPyAnd2Via2l0RmxleEJhc2lzJyA6XG4gICAgICAnbXNGbGV4UHJlZmVycmVkU2l6ZScgaW4gdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlID8gJ21zRmxleFByZWZlcnJlZFNpemUnIDogJ2ZsZXhCYXNpcyc7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdHlsZSA9IHRoaXMud2luZG93UmVmLm5hdGl2ZVdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubmF0aXZlRWxlbWVudCk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUluZm8ocDogUG9pbnQpIHtcbiAgICB0aGlzLmluZm9bJ3dpZHRoJ10gPSBmYWxzZTsgdGhpcy5pbmZvWydoZWlnaHQnXSA9IGZhbHNlO1xuICAgIGlmICh0aGlzLmF4aXMgPT09ICd4Jykge1xuICAgICAgdGhpcy5pbmZvWyd3aWR0aCddID0gcGFyc2VJbnQodGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlW3RoaXMuckZsZXggPyB0aGlzLmZsZXhCYXNpcyA6ICd3aWR0aCddLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5mb1snaGVpZ2h0J10gPSBwYXJzZUludCh0aGlzLm5hdGl2ZUVsZW1lbnQuc3R5bGVbdGhpcy5yRmxleCA/IHRoaXMuZmxleEJhc2lzIDogJ2hlaWdodCddLCAxMCk7XG4gICAgfVxuICAgIHRoaXMuaW5mb1snaWQnXSA9IHRoaXMubmF0aXZlRWxlbWVudC5pZDtcbiAgICB0aGlzLmluZm9bJ3BvaW50J10gPSBwO1xuICB9XG5cbiAgcHVibGljIGRyYWdTdGFydChwOiBQb2ludCwgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy5kcmFnRGlyID0gZGlyZWN0aW9uO1xuICAgIHRoaXMuYXhpcyA9ICh0aGlzLmRyYWdEaXIgPT09ICdsZWZ0JyB8fCB0aGlzLmRyYWdEaXIgPT09ICdyaWdodCcpID8gJ3gnIDogJ3knO1xuICAgIHRoaXMuc3RhcnQgPSAodGhpcy5heGlzID09PSAneCcgPyBwLnggOiBwLnkpO1xuICAgIHRoaXMudyA9IHBhcnNlSW50KHRoaXMuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSwgMTApO1xuICAgIHRoaXMuaCA9IHBhcnNlSW50KHRoaXMuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JyksIDEwKTtcblxuICAgIHRoaXMucmVzaXplU3RhcnQuZW1pdCh7IGluZm86IHRoaXMuaW5mbyB9KTtcblxuICAgIC8vIHByZXZlbnQgdHJhbnNpdGlvbiB3aGlsZSBkcmFnZ2luZ1xuICAgIHRoaXMubm9UcmFuc2l0aW9uID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnRW5kKHA6IFBvaW50KSB7XG4gICAgdGhpcy51cGRhdGVJbmZvKHApO1xuICAgIHRoaXMucmVzaXplRW5kLmVtaXQoeyBpbmZvOiB0aGlzLmluZm8gfSk7XG4gICAgdGhpcy5ub1RyYW5zaXRpb24gPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBkcmFnZ2luZyhwOiBQb2ludCkge1xuICAgIGNvbnN0IG9mZnNldCA9ICh0aGlzLmF4aXMgPT09ICd4JykgPyB0aGlzLnN0YXJ0IC0gcC54IDogdGhpcy5zdGFydCAtIHAueTtcblxuICAgIGxldCBvcGVyYW5kID0gMTtcbiAgICBzd2l0Y2ggKHRoaXMuZHJhZ0Rpcikge1xuICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgb3BlcmFuZCA9IC0xO1xuICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICBjb25zdCBoZWlnaHQgPSAodGhpcy5oIC0gb2Zmc2V0ICogdGhpcy52eSAqIG9wZXJhbmQpICsgJ3B4JztcbiAgICAgICAgaWYgKHRoaXMuckZsZXgpIHtcbiAgICAgICAgICB0aGlzLmZsZXhCYXNpcyA9IGhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICBvcGVyYW5kID0gLTE7XG4gICAgICAgIC8qIGZhbGxzIHRocm91Z2ggKi9cbiAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgY29uc3Qgd2lkdGggPSAodGhpcy53IC0gb2Zmc2V0ICogdGhpcy52eCAqIG9wZXJhbmQpICsgJ3B4JztcbiAgICAgICAgaWYgKHRoaXMuckZsZXgpIHtcbiAgICAgICAgICB0aGlzLmZsZXhCYXNpcyA9IHdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGhpcy51cGRhdGVJbmZvKHApO1xuICAgIHRoaXMucmVzaXppbmcuZW1pdCh7IGluZm86IHRoaXMuaW5mbyB9KTtcbiAgfVxufVxuIl19