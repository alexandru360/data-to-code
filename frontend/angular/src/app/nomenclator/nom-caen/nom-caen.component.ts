import {Component, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {NomCaenService} from './nom-caen-service';

@Component({
  selector: 'app-nom-caen',
  templateUrl: './nom-caen.component.html',
  styleUrls: ['./nom-caen.component.css'],
  providers: [NomCaenService]
})
export class NomCaenComponent implements OnInit {

  files: TreeNode[] = [];

  cols: any[] = [];

  constructor(private nodeService: NomCaenService) {
  }

  ngOnInit(): void {
    this.nodeService.getFilesystem().then((files: TreeNode<any>[]) => this.files = files);

    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'size', header: 'Size'},
      {field: 'type', header: 'Type'}
    ];
  }

}
