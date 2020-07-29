import {Component, HostListener, OnInit} from '@angular/core';
import {NodeService} from './services/node.service';
import {Node} from './interfaces/node';
import {SelectedService} from "./services/selected.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  nodes: Node[]

  constructor(
    private nodeService: NodeService,
    private selectedService: SelectedService,
  ) {
  }

  ngOnInit() {
    this.nodeService.getNodes()
      .subscribe((data: Node[]) => {
        this.nodes = data
        this.selectedService.changeSelected(this.nodeService.loadSelected())
      })
  }

  @HostListener('window:unload')
  unloadHandler() {
    this.nodeService.saveSelected(this.selectedService.getLastSelected())
  }

}
