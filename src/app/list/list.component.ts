import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Node} from '../interfaces/node';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  itemsValue: Node[]

  @Input()
  set items(value: Node[]) {
    this.itemsValue = value;
  }

  trackById(index: number, item: Node): number {
    return item.id
  }

}
