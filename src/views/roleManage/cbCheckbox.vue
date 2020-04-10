<template>
    <div class="cb-checkbox">
        <el-checkbox-group v-model="checkedItem"
                           @change="handleCheckedItem"
                           v-show="data.length">
            <ul class="cb-checkbox-item-wrapper">
                <el-row :gutter="10">
                    <el-col :span="8"
                            v-for="item in data"
                            :key="item[id]">
                        <el-checkbox :label="item[id]">
                            <li class="cb-checkbox-item">
                                {{item.nameCn || item.nameEn}}
                            </li>
                        </el-checkbox>
                    </el-col>
                </el-row>
            </ul>
        </el-checkbox-group>
        <div class="cb-checkbox-all-wrapper" v-show="data.length">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
        </div>
        <div class="cb-checkbox-no-data" v-show="!data.length">暂无备选数据</div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {Component, Watch, Prop} from 'vue-property-decorator'

    @Component({})
    export default class Index extends Vue {
        name: string = 'CbCheckbox';
        checkedItem: Array<string> = [];
        ItemAllData: Array<string> = [];
        isIndeterminate: boolean = false;
        checkAll: boolean = false;
        @Prop({
            type: Array,
            default() {
                return []
            }
        }) data;
        // checkbox 的 选中数据的标识
        @Prop({default: 'resourceId'}) id;
        @Prop({
            default() {
                return [];
            }
        }) defaultChecked;

        @Watch('data')
        dataChange() {
            this.ItemAllData = [];
            this.data.forEach(ite => {
                this.ItemAllData.push(ite[this.id])
            });
        }

        mounted() {
            // 设置默认选中
            this.defaultChecked.forEach(ite => {
                this.checkedItem.push(ite)
            });
        }

        /**
         * check-box change 事件
         * @param value
         */
        handleCheckedItem(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.ItemAllData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.ItemAllData.length;
            this.$emit('item-change');
            this.$emit('change')
        }

        /**
         * check-all change 事件
         * @param val
         */
        handleCheckAllChange(val) {
            this.checkedItem = val ? this.ItemAllData : [];
            this.isIndeterminate = false;
            this.$emit('all-change');
            this.$emit('change')
        }

        /**
         * 向外部提供选择的数据
         */
        getData() {
            return {data: this.data, checkedItem: this.checkedItem}
        }

    }
</script>

<style lang="less">
    .cb-checkbox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        .cb-checkbox-item-wrapper {
            .el-checkbox {
                width: 100%;
                margin: 5px;
                height: 30px;
                line-height: 30px;
                font-size: 12px;
                background: rgba(230, 230, 230, 1);
                border-radius: 2px;
                padding-left: 5px;
                border: 1px solid rgba(230, 230, 230, 1);
                transition: all 0.3s;

                &.is-checked {
                    border: 1px solid #409eff;
                }
            }

            .cb-checkbox-item {
                display: inline-block;
            }
        }

        .el-checkbox-group {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
        }

        .cb-checkbox-all-wrapper {
            padding-left: 10px;
            margin-top: 10px;
        }

        .cb-checkbox-no-data {
            text-align: center;
        }
    }
</style>
