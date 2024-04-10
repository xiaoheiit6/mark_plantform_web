<template>
  <a-form ref="formRef" name="dynamic_form_question_item" :model="dynamicValidateForm" @finish="onFinish">

    <a-form-item label="试卷名称" :name="paperName" :rules="[{ required: true, message: '请输入你的试卷名称!' }]">
      <a-textarea v-model:value="dynamicValidateForm.paperName" auto-size />
    </a-form-item>

    <a-form-item label="试卷描述" :name="description" :rules="[{ required: true, message: '请输入你的试卷描述!' }]">
      <a-textarea v-model:value="dynamicValidateForm.description" auto-size />
    </a-form-item>

    <a-space v-for="(question, index) in dynamicValidateForm.questions" :key="question.id"
      style="display: flex; margin-bottom: 8px" align="baseline">
      <a-form-item :label="'题号 ' + (index + 1) + ' 标准答案'" :name="['questions', index, 'standardAnswer']"
        :rules="{ required: true, message: '缺少标准答案', }">
        <a-textarea v-model:value="question.standardAnswer" placeholder="标准答案" auto-size />
      </a-form-item>
      <a-form-item :label="'题号 ' + (index + 1) + ' 评分标准'" :name="['questions', index, 'criteria']"
        :rules="{ required: true, message: '缺少评分标准', }">
        <a-textarea v-model:value="question.criteria" placeholder="评分标准" auto-size />
      </a-form-item>
      <MinusCircleOutlined @click="removeQuestion(question)" />
    </a-space>

    <a-form-item>
      <a-button type="dashed" block @click="addQuestion">
        <PlusOutlined />
        添加问题
      </a-button>
      <a-button type="primary" html-type="submit">提交</a-button>
    </a-form-item>

  </a-form>

  <a-modal v-model:open="open" title="添加成功" @ok="handleOk">
    <a-result status="success" title="添加成功！"
      sub-title="Order number:  Cloud server configuration takes 1-5 minutes, please wait.">
      <template #extra>
        <!-- 额外操作按钮，如需要可在此处添加 -->
      </template>
    </a-result>
  </a-modal>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useWebStore } from '@/stores/web.js';
import { message } from 'ant-design-vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const route = useRouter();
const open = ref(false);
const handleOk = e => {
  console.log(e);
  open.value = false;
  route.push("/teacher/testPaperList");
};

const webStore = useWebStore();
const formRef = ref();

const dynamicValidateForm = reactive({
  questions: [],
  username: webStore.info.userName,
  token: webStore.info.token,
  paperName: '',
  description: '',
});

const removeQuestion = question => {
  const index = dynamicValidateForm.questions.indexOf(question);
  if (index !== -1) {
    dynamicValidateForm.questions.splice(index, 1);
  }
};

const addQuestion = () => {
  const index = dynamicValidateForm.questions.length;
  dynamicValidateForm.questions.push({
    standardAnswer: '',
    criteria: '',
    question: index.toString()
  });
};

const onFinish = values => {
  open.value = true;
  message.success('添加试卷成功');
  axios.post("/api/teacher/creatPaper", dynamicValidateForm)
    .then(response => {
      if (response.data.code === 200) {
        console.log("success");
      }
    })
    .catch(error => {
      console.log(error);
    });
  console.log('表单的值:', values);
  console.log('问题列表:', dynamicValidateForm);
};
</script>
