import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Node} from '../interfaces/node';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {

  private lastValue: Node[]

  private selected$: BehaviorSubject<Node[]> = new BehaviorSubject<Node[]>([])

  changeSelected(value: Node[]): void {
    this.lastValue = value
    this.selected$.next(value)
  }

  getSelected(): BehaviorSubject<Node[]> {
    return this.selected$
  }

  getLastSelected(): Node[] {
    return this.lastValue
  }
}
