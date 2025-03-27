export class QuestionDTO {
    constructor(data) {
      this.question_id = data.question_id;
      this.question_text = data.question_text;
      this.skill_id = data.skill_id;
      this.skill_name = data.skill_name;
      this.is_available = data.is_available;
      this.is_report = data.is_report;
      this.create_at = data.create_at;
      this.user_id = data.user_id;
      this.created_by = data.created_by;
    }
  }

export class QuestionDetailDTO {
    constructor(data) {
      this.question_id = data.question_id;
      this.question = data.question_text;
      this.skill = data.skill;
      this.options = data.options;
      this.is_available = data.is_available;
      this.is_report = data.is_report;
    }
  }
  

export class OptionDTO {
    constructor(data) {
      this.option_id = data.option_id;
      this.option_text = data.option_text;
      this.is_correct = data.is_correct;
    }
  }
  