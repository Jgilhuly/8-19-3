import express from 'express';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactInfo:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           example: "NeuraLink AI"
 *         email:
 *           type: string
 *           format: email
 *           example: "contact@neuralink-ai.com"
 *         phone:
 *           type: string
 *           example: "+1 (555) 123-4567"
 *         location:
 *           type: string
 *           example: "San Francisco, CA"
 *         address:
 *           type: object
 *           properties:
 *             street:
 *               type: string
 *               example: "123 Innovation Drive, Suite 400"
 *             city:
 *               type: string
 *               example: "San Francisco"
 *             state:
 *               type: string
 *               example: "CA"
 *             zipCode:
 *               type: string
 *               example: "94105"
 *             country:
 *               type: string
 *               example: "United States"
 *         socialMedia:
 *           type: object
 *           properties:
 *             linkedin:
 *               type: string
 *               format: uri
 *               example: "https://linkedin.com/company/neuralink-ai"
 *             twitter:
 *               type: string
 *               format: uri
 *               example: "https://twitter.com/neuralinklai"
 *             github:
 *               type: string
 *               format: uri
 *               example: "https://github.com/neuralink-ai"
 *         businessHours:
 *           type: object
 *           properties:
 *             monday:
 *               type: string
 *               example: "9:00 AM - 6:00 PM PST"
 *             tuesday:
 *               type: string
 *               example: "9:00 AM - 6:00 PM PST"
 *             wednesday:
 *               type: string
 *               example: "9:00 AM - 6:00 PM PST"
 *             thursday:
 *               type: string
 *               example: "9:00 AM - 6:00 PM PST"
 *             friday:
 *               type: string
 *               example: "9:00 AM - 6:00 PM PST"
 *             saturday:
 *               type: string
 *               example: "Closed"
 *             sunday:
 *               type: string
 *               example: "Closed"
 *         responseTime:
 *           type: string
 *           example: "We typically respond within 24 hours"
 *     ConsultationRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the requester
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the requester
 *           example: "john.doe@example.com"
 *         company:
 *           type: string
 *           description: Company name (optional)
 *           example: "Acme Corp"
 *         message:
 *           type: string
 *           description: Message or inquiry details
 *           example: "We are interested in implementing AI solutions for our customer service department."
 *         serviceInterest:
 *           type: string
 *           description: Specific service of interest (optional)
 *           example: "Natural Language Processing"
 *       required:
 *         - name
 *         - email
 *         - message
 *     ConsultationRequestFull:
 *       allOf:
 *         - $ref: '#/components/schemas/ConsultationRequest'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Unique request identifier
 *               example: 1
 *             timestamp:
 *               type: string
 *               format: date-time
 *               description: Request submission timestamp
 *               example: "2024-01-15T10:30:00.000Z"
 *             status:
 *               type: string
 *               description: Current status of the request
 *               example: "pending"
 *     ConsultationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Consultation request submitted successfully"
 *         requestId:
 *           type: integer
 *           example: 1
 *         estimatedResponseTime:
 *           type: string
 *           example: "24 hours"
 *     ConsultationRequestList:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Total number of consultation requests
 *           example: 5
 *         requests:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ConsultationRequestFull'
 *     ValidationError:
 *       allOf:
 *         - $ref: '#/components/schemas/Error'
 *         - type: object
 *           properties:
 *             error:
 *               example: "Missing required fields"
 *             message:
 *               example: "Name, email, and message are required"
 *     InvalidEmailError:
 *       allOf:
 *         - $ref: '#/components/schemas/Error'
 *         - type: object
 *           properties:
 *             error:
 *               example: "Invalid email"
 *             message:
 *               example: "Please provide a valid email address"
 */

// Contact information
const contactInfo = {
  company: "NeuraLink AI",
  email: "contact@neuralink-ai.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  address: {
    street: "123 Innovation Drive, Suite 400",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States"
  },
  socialMedia: {
    linkedin: "https://linkedin.com/company/neuralink-ai",
    twitter: "https://twitter.com/neuralinklai",
    github: "https://github.com/neuralink-ai"
  },
  businessHours: {
    monday: "9:00 AM - 6:00 PM PST",
    tuesday: "9:00 AM - 6:00 PM PST",
    wednesday: "9:00 AM - 6:00 PM PST",
    thursday: "9:00 AM - 6:00 PM PST",
    friday: "9:00 AM - 6:00 PM PST",
    saturday: "Closed",
    sunday: "Closed"
  },
  responseTime: "We typically respond within 24 hours"
};

// Demo consultation requests storage (in production, this would be a database)
let consultationRequests = [];

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get contact information
 *     tags: [Contact]
 *     description: Retrieve company contact information including address, phone, email, and business hours
 *     responses:
 *       200:
 *         description: Contact information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactInfo'
 */
router.get('/', (req, res) => {
  res.json(contactInfo);
});

/**
 * @swagger
 * /api/contact/consultation:
 *   post:
 *     summary: Submit a consultation request
 *     tags: [Contact]
 *     description: Submit a consultation request for AI services
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultationRequest'
 *           examples:
 *             basicRequest:
 *               summary: Basic consultation request
 *               value:
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 message: "I'm interested in AI solutions for my business."
 *             detailedRequest:
 *               summary: Detailed consultation request
 *               value:
 *                 name: "Jane Smith"
 *                 email: "jane.smith@company.com"
 *                 company: "Tech Corp"
 *                 message: "We need help with implementing machine learning models for our e-commerce platform."
 *                 serviceInterest: "Machine Learning Development"
 *     responses:
 *       201:
 *         description: Consultation request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultationResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/InvalidEmailError'
 */
router.post('/consultation', (req, res) => {
  const { name, email, company, message, serviceInterest } = req.body;
  
  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Name, email, and message are required'
    });
  }
  
  // Email validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email',
      message: 'Please provide a valid email address'
    });
  }
  
  const request = {
    id: consultationRequests.length + 1,
    name,
    email,
    company: company || 'Not specified',
    message,
    serviceInterest: serviceInterest || 'General inquiry',
    timestamp: new Date().toISOString(),
    status: 'pending'
  };
  
  consultationRequests.push(request);
  
  res.status(201).json({
    message: 'Consultation request submitted successfully',
    requestId: request.id,
    estimatedResponseTime: '24 hours'
  });
});

/**
 * @swagger
 * /api/contact/consultation-requests:
 *   get:
 *     summary: Get all consultation requests
 *     tags: [Contact]
 *     description: Retrieve a list of all consultation requests (demo purposes)
 *     responses:
 *       200:
 *         description: List of consultation requests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultationRequestList'
 */
router.get('/consultation-requests', (req, res) => {
  res.json({
    total: consultationRequests.length,
    requests: consultationRequests
  });
});

/**
 * @swagger
 * /api/contact/consultation-requests/{id}:
 *   get:
 *     summary: Get a specific consultation request by ID
 *     tags: [Contact]
 *     description: Retrieve detailed information about a specific consultation request
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The consultation request ID
 *         example: 1
 *     responses:
 *       200:
 *         description: Consultation request retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultationRequestFull'
 *       404:
 *         description: Consultation request not found
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *                 - type: object
 *                   properties:
 *                     error:
 *                       example: "Request not found"
 *                     message:
 *                       example: "Consultation request with ID 1 does not exist"
 */
router.get('/consultation-requests/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const request = consultationRequests.find(r => r.id === id);
  
  if (!request) {
    return res.status(404).json({
      error: 'Request not found',
      message: `Consultation request with ID ${id} does not exist`
    });
  }
  
  res.json(request);
});

export default router;
