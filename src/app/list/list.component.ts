import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Node} from '../interfaces/node';
import {SelectedService} from "../services/selected.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {

  items: Node[]

  constructor(
    private selectedService: SelectedService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.selectedService.getSelected()
      .subscribe((items: Node[]) => {
        this.items = items
        this.changeDetector.detectChanges()
      })
  }

}
