import { pool } from "../db.js";
import { SkillDTO } from "../dtos/skill.js";
import { getAllSkillQuery } from "../queries/skillQueries.js";

//-------------------
// GET ALL SKILL
//-------------------

export const getAllSkill = async (req, res) => {
  try {
    const [result] = await pool.query(getAllSkillQuery);

    const skills = result.map((item) => new SkillDTO(item));

    res.status(200).json({
      success: true,
      skills: skills,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
