<template>

    <a-table bordered :data-source="dataSource" :columns="columns">
        <template #bodyCell="{ column, text, record }">

            <template v-if="column.dataIndex === 'testPaperId'">
                <div class="editable-cell">
                    <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                        <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
                        <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
                    </div>

                </div>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">
                <a-upload v-model:file-list="fileList" name="file"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76" :headers="headers" @change="handleChange">
                    <a>
                        <upload-outlined></upload-outlined>
                        Click to Upload
                    </a>
                </a-upload>

            </template>

        </template>

    </a-table>

</template>

<script setup>
import { onMounted, computed, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import axios from 'axios';
const dataSource = ref([
    
]);

const test = reactive({
    test:""
})

onMounted(() => {
    axios.post('/api/student',test).then(response => {
        console.log(response)
    }).catch(error => {
        console.log(error)
    })
    dataSource.value.push(datas)
})


const handleChange = info => {
    if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
    }
};
const fileList = ref([]);
const headers = {
    authorization: 'authorization-text',
};

const columns = [
    {
        title: '试卷id',
        dataIndex: 'testPaperId',
        width: '20%',
    },
    {
        title: '状态',
        dataIndex: 'status',
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