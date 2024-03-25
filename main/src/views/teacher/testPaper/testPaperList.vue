<template>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">添加试卷</a-button>
    <a-table bordered :data-source="dataSource" :columns="columns">
        <template #bodyCell="{ column, text, record }">

            <template v-if="column.dataIndex === 'name'">
                <div class="editable-cell">
                    <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                        <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
                        <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                    </div>

                </div>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">

                <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
                    <a>删除</a>
                </a-popconfirm>
                <a>编辑</a>

            </template>

        </template>
        
    </a-table>
    
</template>

<script setup>
import { onMounted,computed, reactive, ref } from 'vue';
const dataSource = ref([
    {
        key: '0',
        name: 'Edward King 0',
        age: 32,
        address: 'London, Park Lane no. 0',
    },
]);

onMounted(()=> {
    const datas = {
        
        key: '1',
        name: 'Edward King 0',
        age: 32,
        address: 'London, Park Lane no. 0',
    
    }
    dataSource.value.push(datas)
})


const columns = [
    {
        title: '试卷id',
        dataIndex: 'testPaperId',
        width: '20%',
    },
    {
        title: '题目数',
        dataIndex: 'problemNums',
    },
    {
        title: '试卷描述备注',
        dataIndex: 'address',
    },
    {
        title: '操作',
        dataIndex: 'operation',
    },
];

const count = computed(() => dataSource.value.length + 1);
const editableData = reactive({});

const save = key => {
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
    delete editableData[key];
};
const onDelete = key => {
    dataSource.value = dataSource.value.filter(item => item.key !== key);
};
const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
    };
    dataSource.value.push(newData);
};
</script>

<style scoped>
.editable-cell {
    position: relative;

    .editable-cell-input-wrapper,
    .editable-cell-text-wrapper {
        padding-right: 24px;
    }

    .editable-cell-text-wrapper {
        padding: 5px 24px 5px 5px;
    }

    .editable-cell-icon,
    .editable-cell-icon-check {
        position: absolute;
        right: 0;
        width: 20px;
        cursor: pointer;
    }

    .editable-cell-icon {
        margin-top: 4px;
        display: none;
    }

    .editable-cell-icon-check {
        line-height: 28px;
    }

    .editable-cell-icon:hover,
    .editable-cell-icon-check:hover {
        color: #108ee9;
    }

    .editable-add-btn {
        margin-bottom: 8px;
    }
}

.editable-cell:hover .editable-cell-icon {
    display: inline-block;
}
</style>