<template>
  <a-form ref="formRef" name="dynamic_form_question_item" :model="dynamicValidateForm" @finish="onFinish">

    <a-form-item label="试卷名称" :name="paperName" 
    :rules="[{ required: true, message: '请输入你的试卷名称!' }]">
      <a-input v-model:value="dynamicValidateForm.paperName" />
    </a-form-item>

    <a-form-item label="试卷描述" :name="description"
        :rules="[{ required: true, message: '请输入你的试卷描述!' }]">
        <a-input v-model:value="dynamicValidateForm.description" />
    </a-form-item>

    <a-space v-for="(question, index) in dynamicValidateForm.questions" :key="question.id"
      style="display: flex; margin-bottom: 8px" align="baseline">
      <a-form-item :label="'题号 ' + (index + 1) + ' 标准答案'" :name="['questions', index, 'standardAnswer']"
        :rules="{ required: true, message: '缺少标准答案', }">
        <a-input v-model:value="question.standardAnswer" placeholder="标准答案" />
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
import { message } from 'ant-design-vue';
import axios from 'axios';

const webStore = useWebStore()
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
  // 使用当前问题列表的长度作为新问题的索引
  const index = dynamicValidateForm.questions.length;
  dynamicValidateForm.questions.push({
    standardAnswer: '',
    criteria: '',
    question: index.toString() // 将索引保存在问题对象中
  });
};


const onFinish = values => {
  message.success('添加试卷成功');
  axios.post("/api/teacher/creatPaper",dynamicValidateForm)
  .then(response =>{
    if(response.data.code === 200){
      console.log("success")
    }
    
  })
  .catch(error=>{
    console.log(error)
  })
  console.log('表单的值:', values);
  console.log('问题列表:', dynamicValidateForm);

};
</script>