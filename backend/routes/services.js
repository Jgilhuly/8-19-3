import express from 'express';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the service
 *           example: 1
 *         title:
 *           type: string
 *           description: Service title
 *           example: "AI Strategy Consulting"
 *         description:
 *           type: string
 *           description: Detailed service description
 *           example: "Strategic roadmaps for AI adoption and digital transformation tailored to your industry and business goals."
 *         icon:
 *           type: string
 *           description: Emoji icon for the service
 *           example: "🎯"
 *         features:
 *           type: array
 *           items:
 *             type: string
 *           description: List of service features
 *           example: ["AI Readiness Assessment", "Technology Roadmapping", "ROI Analysis", "Risk Assessment"]
 *         price:
 *           type: string
 *           description: Service pricing information
 *           example: "Starting at $15,000"
 *     ServiceNotFound:
 *       allOf:
 *         - $ref: '#/components/schemas/Error'
 *         - type: object
 *           properties:
 *             error:
 *               example: "Service not found"
 *             message:
 *               example: "Service with ID 1 does not exist"
 */

// Mock data for AI services
const services = [
  {
    id: 1,
    title: "AI Strategy Consulting",
    description: "Strategic roadmaps for AI adoption and digital transformation tailored to your industry and business goals.",
    icon: "🎯",
    features: [
      "AI Readiness Assessment",
      "Technology Roadmapping", 
      "ROI Analysis",
      "Risk Assessment"
    ],
    price: "Starting at $15,000"
  },
  {
    id: 2,
    title: "Machine Learning Development",
    description: "Custom ML models and algorithms designed specifically for your unique use cases and data requirements.",
    icon: "🤖",
    features: [
      "Custom Model Development",
      "Data Pipeline Design",
      "Model Training & Optimization",
      "Performance Monitoring"
    ],
    price: "Starting at $25,000"
  },
  {
    id: 3,
    title: "Process Automation",
    description: "Intelligent automation solutions that streamline operations and reduce manual workload across your organization.",
    icon: "⚡",
    features: [
      "Process Analysis",
      "RPA Implementation",
      "Workflow Optimization",
      "Integration Support"
    ],
    price: "Starting at $12,000"
  },
  {
    id: 4,
    title: "Computer Vision Solutions",
    description: "Advanced image and video analysis capabilities for quality control, security, and business intelligence.",
    icon: "👁️",
    features: [
      "Object Detection",
      "Image Classification",
      "Video Analytics",
      "Real-time Processing"
    ],
    price: "Starting at $30,000"
  },
  {
    id: 5,
    title: "Natural Language Processing",
    description: "Unlock insights from text data with sentiment analysis, document processing, and conversational AI solutions.",
    icon: "💬",
    features: [
      "Sentiment Analysis",
      "Document Processing",
      "Chatbot Development",
      "Language Translation"
    ],
    price: "Starting at $20,000"
  },
  {
    id: 6,
    title: "Predictive Analytics",
    description: "Forecast trends, customer behavior, and business outcomes using advanced statistical modeling and ML techniques.",
    icon: "📈",
    features: [
      "Time Series Forecasting",
      "Customer Segmentation",
      "Demand Prediction",
      "Churn Analysis"
    ],
    price: "Starting at $18,000"
  }
];

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     tags: [Services]
 *     description: Retrieve a list of all AI services offered by NeuraLink AI
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Service'
 */
router.get('/', (req, res) => {
  res.json(services);
});

/**
 * @swagger
 * /api/services/{id}:
 *   get:
 *     summary: Get a specific service by ID
 *     tags: [Services]
 *     description: Retrieve detailed information about a specific AI service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The service ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Service retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       404:
 *         description: Service not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServiceNotFound'
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const service = services.find(s => s.id === id);
  
  if (!service) {
    return res.status(404).json({ 
      error: 'Service not found',
      message: `Service with ID ${id} does not exist`
    });
  }
  
  res.json(service);
});

export default router;
