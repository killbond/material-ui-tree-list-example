import {Injectable} from '@angular/core';
import {Node} from '../interfaces/node';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private nodes: Node[] = [
    {
      id: 1,
      name: 'Fruit',
      children: [
        {id: 2, name: 'Apple'},
        {id: 3, name: 'Banana'},
        {id: 4, name: 'Fruit loops'},
      ]
    },
    {
      id: 5,
      name: 'Vegetables',
      children: [
        {
          id: 6,
          name: 'Green',
          children: [
            {id: 7, name: 'Broccoli'},
            {id: 8, name: 'Brussels sprouts'},
          ]
        }, {
          id: 9,
          name: 'Orange',
          children: [
            {id: 10, name: 'Pumpkins'},
            {id: 11, name: 'Carrots'},
          ]
        },
      ]
    },
    {
      id: 12,
      name: 'level 1',
      children: [
        {
          id: 13,
          name: 'level 2',
          children: [
            {
              id: 14,
              name: 'level 3',
              children: [
                {
                  id: 15,
                  name: 'node 1',
                },
                {
                  id: 17,
                  name: 'node 3',
                },
              ]
            }
          ],
        }
      ]
    },
  ]

  getNodes(): Observable<Node[]> {
    return of(this.nodes)
  }

  saveSelected(nodes: Node[] = []): void {
    localStorage.setItem('selected', JSON.stringify(nodes))
  }

  loadSelected(): Node[] {
    return JSON.parse(localStorage.getItem('selected')) || []
  }

}
