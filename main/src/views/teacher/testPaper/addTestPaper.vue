<template>
  <a-form ref="formRef" name="dynamic_form_question_item" :model="dynamicValidateForm" @finish="onFinish">

    <a-form-item label="试卷名称" :name="paperName" 
    :rules="[{ required: true, message: '请输入你的试卷名称!' }]">
      <a-input v-model:value="formState.paperName" />
    </a-form-item>

    <a-form-item label="试卷描述" :name="description"
        :rules="[{ required: true, message: '请输入你的试卷描述!' }]">
        <a-input v-model:value="formState.description" />
    </a-form-item>

    <a-space v-for="(question, index) in dynamicValidateForm.questions" :key="question.id"
      style="display: flex; margin-bottom: 8px" align="baseline">
      <a-form-item :label="'题号 ' + (index + 1) + ' 标准答案'" :name="['questions', index, 'answer']"
        :rules="{ required: true, message: '缺少标准答案', }">
        <a-input v-model:value="question.answer" placeholder="标准答案" />
      </a-form-item>
      <a-form-item :label="'题号 ' + (index + 1) + ' 评分标准'" :name="['questions', index, 'criteria']"
        :rules="{ required: true, message: '缺少评分标准', }">
        <a-input v-model:value="question.criteria" placeholder="评分标准" />
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
</template>

<script setup>
import { reactive, ref } from 'vue';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { useWebStore } from '@/stores/web.js';
import axios from 'axios';

const formState = reactive({
  paperName: '',
  description: '',
  remember: true,
});

const webStore = useWebStore()
const formRef = ref();
const dynamicValidateForm = reactive({

  questions: [],
  username: webStore.info.userName,
  token: webStore.info.token,
  // paperName:
  // description
});

const removeQuestion = question => {
  const index = dynamicValidateForm.questions.indexOf(question);
  if (index !== -1) {
    dynamicValidateForm.questions.splice(index, 1);
  }
};

const addQuestion = () => {
  dynamicValidateForm.questions.push({
    answer: '',
    criteria: '',
    id: Date.now(),
  });
};

const onFinish = values => {
  console.log('表单的值:', values);
  console.log('问题列表:', dynamicValidateForm);
  axios.post("/api/teacher/creatPaper",dynamicValidateForm)
  .then(response =>{
    
  })
  .catch(error=>{
    console.log(error)
  })

};
</script>