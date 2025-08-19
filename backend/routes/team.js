import express from 'express';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TeamMember:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the team member
 *           example: 1
 *         name:
 *           type: string
 *           description: Full name of the team member
 *           example: "Dr. Sarah Chen"
 *         role:
 *           type: string
 *           description: Job title/role
 *           example: "Chief AI Officer & Founder"
 *         bio:
 *           type: string
 *           description: Biography/description
 *           example: "PhD in Machine Learning from Stanford. 10+ years leading enterprise AI transformations at Fortune 500 companies."
 *         initials:
 *           type: string
 *           description: Team member initials
 *           example: "SC"
 *         expertise:
 *           type: array
 *           items:
 *             type: string
 *           description: Areas of expertise
 *           example: ["Machine Learning", "AI Strategy", "Deep Learning"]
 *         education:
 *           type: string
 *           description: Educational background
 *           example: "PhD Computer Science, Stanford University"
 *         experience:
 *           type: string
 *           description: Previous work experience
 *           example: "Former AI Director at Google, Meta"
 *         linkedin:
 *           type: string
 *           description: LinkedIn profile URL
 *           example: "https://linkedin.com/in/sarahchen-ai"
 *     TeamMemberNotFound:
 *       allOf:
 *         - $ref: '#/components/schemas/Error'
 *         - type: object
 *           properties:
 *             error:
 *               example: "Team member not found"
 *             message:
 *               example: "Team member with ID 1 does not exist"
 */

// Mock data for team members
const team = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chief AI Officer & Founder",
    bio: "PhD in Machine Learning from Stanford. 10+ years leading enterprise AI transformations at Fortune 500 companies.",
    initials: "SC",
    expertise: ["Machine Learning", "AI Strategy", "Deep Learning"],
    education: "PhD Computer Science, Stanford University",
    experience: "Former AI Director at Google, Meta",
    linkedin: "https://linkedin.com/in/sarahchen-ai"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Lead Data Scientist",
    bio: "Expert in deep learning and computer vision with a track record of deploying ML models at scale.",
    initials: "MR",
    expertise: ["Computer Vision", "Deep Learning", "MLOps"],
    education: "MS Data Science, MIT",
    experience: "8 years at Tesla, Amazon",
    linkedin: "https://linkedin.com/in/mrodriguez-ml"
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "AI Solutions Architect",
    bio: "Specializes in designing scalable AI infrastructure and cloud-native ML deployment strategies.",
    initials: "EJ",
    expertise: ["Cloud Architecture", "MLOps", "System Design"],
    education: "MS Computer Engineering, Berkeley",
    experience: "6 years at AWS, Microsoft",
    linkedin: "https://linkedin.com/in/emilyjohnson-ai"
  },
  {
    id: 4,
    name: "Dr. James Kim",
    role: "Research Director",
    bio: "Leading researcher in reinforcement learning and autonomous systems with 50+ published papers.",
    initials: "JK",
    expertise: ["Reinforcement Learning", "Robotics", "Research"],
    education: "PhD Robotics, Carnegie Mellon",
    experience: "Former Principal Scientist at OpenAI",
    linkedin: "https://linkedin.com/in/jameskim-research"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "NLP Engineering Lead",
    bio: "Expert in natural language processing and conversational AI with focus on enterprise applications.",
    initials: "LW",
    expertise: ["NLP", "Conversational AI", "Language Models"],
    education: "MS Linguistics, Harvard",
    experience: "5 years at Facebook AI Research",
    linkedin: "https://linkedin.com/in/lisawang-nlp"
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "AI Product Manager",
    bio: "Bridges the gap between AI research and business value, ensuring successful AI product adoption.",
    initials: "AT",
    expertise: ["Product Strategy", "AI Ethics", "Business Development"],
    education: "MBA Stanford, BS Computer Science",
    experience: "Product Manager at Uber, Airbnb",
    linkedin: "https://linkedin.com/in/alexthompson-ai"
  }
];

/**
 * @swagger
 * /api/team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     description: Retrieve a list of all NeuraLink AI team members
 *     responses:
 *       200:
 *         description: List of team members retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamMember'
 */
router.get('/', (req, res) => {
  res.json(team);
});

/**
 * @swagger
 * /api/team/{id}:
 *   get:
 *     summary: Get a specific team member by ID
 *     tags: [Team]
 *     description: Retrieve detailed information about a specific team member
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The team member ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Team member retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: Team member not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeamMemberNotFound'
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const member = team.find(m => m.id === id);
  
  if (!member) {
    return res.status(404).json({ 
      error: 'Team member not found',
      message: `Team member with ID ${id} does not exist`
    });
  }
  
  res.json(member);
});

/**
 * @swagger
 * /api/team/expertise/{skill}:
 *   get:
 *     summary: Get team members by expertise
 *     tags: [Team]
 *     description: Retrieve team members who have expertise in a specific skill area
 *     parameters:
 *       - in: path
 *         name: skill
 *         required: true
 *         schema:
 *           type: string
 *         description: The skill/expertise to search for (case-insensitive)
 *         example: "machine learning"
 *     responses:
 *       200:
 *         description: Team members with matching expertise retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeamMember'
 *       404:
 *         description: No team members found with the specified expertise
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     error:
 *                       example: "No team members found"
 *                     message:
 *                       example: 'No team members found with expertise in "machine learning"'
 */
router.get('/expertise/:skill', (req, res) => {
  const skill = req.params.skill.toLowerCase();
  const members = team.filter(m => 
    m.expertise.some(exp => exp.toLowerCase().includes(skill))
  );
  
  if (members.length === 0) {
    return res.status(404).json({ 
      error: 'No team members found',
      message: `No team members found with expertise in "${skill}"`
    });
  }
  
  res.json(members);
});

export default router;
