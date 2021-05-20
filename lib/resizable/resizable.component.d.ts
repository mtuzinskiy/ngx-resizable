import { OnInit, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import { NgxResizeableWindowRef } from '../window.service';
import { Point } from './drag.directive';
export declare class ResizableComponent implements OnInit, AfterViewInit {
    private regionElement;
    private windowRef;
    resizable: boolean;
    noTransition: boolean;
    width: any;
    height: any;
    flexBasis: any;
    directions: any;
    rFlex: boolean;
    resizeStart: EventEmitter<{}>;
    resizing: EventEmitter<{}>;
    resizeEnd: EventEmitter<{}>;
    private nativeElement;
    private style;
    private w;
    private h;
    private vx;
    private vy;
    private start;
    private dragDir;
    private axis;
    private info;
    constructor(regionElement: ElementRef, windowRef: NgxResizeableWindowRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private updateInfo;
    dragStart(p: Point, direction: any): void;
    dragEnd(p: Point): void;
    dragging(p: Point): void;
}