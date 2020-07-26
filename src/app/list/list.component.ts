import {Component, Input} from '@angular/core';
import {Node} from '../interfaces/node';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input()
  items: Node[] = []

}
