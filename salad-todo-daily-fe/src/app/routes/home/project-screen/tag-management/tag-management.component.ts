import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TaskTag } from 'src/app/models/TaskTag';
import { TaskTagService } from 'src/app/services/task-tag/task-tag.service';

export enum TagModalViewMode {
  Create = 0,
  Edit = 1,
}
@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.css'],
})
export class TagManagementComponent implements OnInit {
  listTags: TaskTag[] = [];
  isShowModal: boolean = false;
  tagForm!: FormGroup;
  TagModalViewMode = TagModalViewMode;
  modalViewMode?: TagModalViewMode;
  selectedTag: any;
  constructor(
    private tagService: TaskTagService,
    private msg: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getListTags();
    this.initTagForm();
  }

  getListTags(): void {
    this.tagService
      .getAllTaskTag()
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.listTags = res.result;
        } else {
          this.msg.error('Có lỗi xảy ra. Không thể lấy danh sách nhãn chủ đề.');
        }
      });
  }

  initTagForm() {
    this.tagForm = this.fb.group({
      name: [null, [Validators.required]],
      color: [null],
    });
  }

  openAddModal(): void {
    this.isShowModal = true;
    this.modalViewMode = TagModalViewMode.Create;
    this.tagForm.reset();
  }
  openEditModal(data: any): void {
    this.isShowModal = true;
    this.modalViewMode = TagModalViewMode.Edit;
    this.tagForm.patchValue(data);
    this.selectedTag = data;
  }
  handleCancel(): void {
    this.isShowModal = false;
  }

  handleOk(): void {
    switch (this.modalViewMode) {
      case TagModalViewMode.Create:
        this.addTag();
        break;
      case TagModalViewMode.Edit:
        this.updateTag();
        break;
      default:
        break;
    }
  }

  addTag(): void {
    this.tagService
      .addNewTag(this.tagForm.value)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Tạo nhãn thành công!');
          this.tagForm.reset();
          this.isShowModal = false;
          this.getListTags();
        } else {
          this.msg.error('Tạo nhãn thất bại');
        }
      });
  }

  updateTag(): void {
    this.tagService
      .updateTag(this.selectedTag.id, this.tagForm.value)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Cập nhật nhãn thành công!');
          this.tagForm.reset();
          this.isShowModal = false;
          this.getListTags();
        } else {
          this.msg.error('Cập nhật nhãn thất bại');
        }
      });
  }

  deleteTag(recordId: any) {
    const payload = {
      isDeleted: 1,
    };
    this.tagService
      .updatePropTag(recordId, payload)
      .toPromise()
      .then((res: any) => {
        if (res && res.result) {
          this.msg.success('Xóa nhãn thành công!');
          this.getListTags();
        } else {
          this.msg.error('Xóa nhãn thất bại');
        }
      });
  }
}
