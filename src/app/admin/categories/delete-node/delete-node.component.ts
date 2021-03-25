import { TreeData } from '../../../shared/interfaces';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-delete-node',
  templateUrl: './delete-node.component.html',
  styleUrls: ['./delete-node.component.scss']
})
export class DeleteNodeComponent {
  @Output() deletedNode = new EventEmitter;
  @Input() currentNode: TreeData;

  deleteNode() {
    this.deletedNode.emit(this.currentNode);
  }

}
