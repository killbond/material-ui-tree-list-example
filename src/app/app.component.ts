import {Component, HostListener, OnInit} from '@angular/core';
import {NodeService} from './services/node.service';
import {Node} from './interfaces/node';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  nodes: Node[]

  selected: Node[]

  constructor(public nodeService: NodeService) {}

  ngOnInit() {
    this.nodeService.getNodes()
      .subscribe((data: Node[]) => {
        this.nodes = data
        this.selected = this.nodeService.loadSelected()
      })
  }

  @HostListener('window:unload')
  unloadHandler() {
    this.nodeService.saveSelected(this.selected)
  }

}
