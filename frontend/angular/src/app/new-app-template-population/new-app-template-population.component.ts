import {Component, ElementRef, ViewChild} from '@angular/core';
import {DropEvent} from 'angular-draggable-droppable';
import {
  DroppableDirective,
  ValidateDrop,
} from 'angular-draggable-droppable/lib/droppable.directive';

@Component({
  selector: 'app-new-app-template-population',
  templateUrl: './new-app-template-population.component.html',
  styleUrls: ['./new-app-template-population.component.css'],
})
export class NewAppTemplatePopulationComponent {
  droppedData: string;
  droppedData2: string;

  @ViewChild(DroppableDirective, {read: ElementRef})
  // droppableElement: ElementRef;
  droppableElement: any;

  constructor() {
    this.droppedData = '';
    this.droppedData2 = '';
  }

  onDrop({dropData}: DropEvent<string>): void {
    this.droppedData = dropData;
    setTimeout(() => {
      this.droppedData = '';
    }, 2000);
  }

  onDrop2({dropData}: DropEvent<string>): void {
    this.droppedData2 = dropData;
    setTimeout(() => {
      this.droppedData2 = '';
    }, 2000);
  }

  validateDrop: ValidateDrop = ({target}) =>
    this.droppableElement.nativeElement.contains(target as Node);
}
