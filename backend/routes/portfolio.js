const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const { upload } = require('../middleware/upload');

const router = express.Router();

// Get portfolio data (public)
router.get('/', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
      await portfolio.save();
    }
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update personal info
router.put('/personal-info', auth, upload.single('profileImage'), async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    const personalInfo = JSON.parse(req.body.personalInfo || '{}');
    
    if (req.file) {
      personalInfo.profileImage = req.file.path;
    }

    portfolio.personalInfo = { ...portfolio.personalInfo, ...personalInfo };
    await portfolio.save();

    res.json({ success: true, data: portfolio.personalInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Skills CRUD
router.post('/skills', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    portfolio.skills.push(req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/skills/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const skill = portfolio.skills.id(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    Object.assign(skill, req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/skills/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.skills.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Projects CRUD
router.post('/projects', auth, upload.single('image'), async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    const projectData = JSON.parse(req.body.projectData || '{}');
    
    if (req.file) {
      projectData.image = req.file.path;
    }

    portfolio.projects.push(projectData);
    await portfolio.save();

    res.json({ success: true, data: portfolio.projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/projects/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const project = portfolio.projects.id(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const projectData = JSON.parse(req.body.projectData || '{}');
    
    if (req.file) {
      projectData.image = req.file.path;
    }

    Object.assign(project, projectData);
    await portfolio.save();

    res.json({ success: true, data: portfolio.projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/projects/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.projects.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Experience CRUD
router.post('/experience', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    portfolio.experience.push(req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/experience/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const exp = portfolio.experience.id(req.params.id);
    
    if (!exp) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    Object.assign(exp, req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/experience/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.experience.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.experience });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Education CRUD
router.post('/education', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    portfolio.education.push(req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/education/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const edu = portfolio.education.id(req.params.id);
    
    if (!edu) {
      return res.status(404).json({ message: 'Education not found' });
    }

    Object.assign(edu, req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/education/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.education.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.education });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Certificates CRUD
router.post('/certificates', auth, upload.single('image'), async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    const certificateData = JSON.parse(req.body.certificateData || '{}');
    
    if (req.file) {
      certificateData.image = req.file.path;
    }

    portfolio.certificates.push(certificateData);
    await portfolio.save();

    res.json({ success: true, data: portfolio.certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/certificates/:id', auth, upload.single('image'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const certificate = portfolio.certificates.id(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }

    const certificateData = JSON.parse(req.body.certificateData || '{}');
    
    if (req.file) {
      certificateData.image = req.file.path;
    }

    Object.assign(certificate, certificateData);
    await portfolio.save();

    res.json({ success: true, data: portfolio.certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/certificates/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.certificates.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.certificates });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Languages CRUD
router.post('/languages', auth, async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    portfolio.languages.push(req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.languages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/languages/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const language = portfolio.languages.id(req.params.id);
    
    if (!language) {
      return res.status(404).json({ message: 'Language not found' });
    }

    Object.assign(language, req.body);
    await portfolio.save();

    res.json({ success: true, data: portfolio.languages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/languages/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.languages.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.languages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Contact form
router.post('/contact', async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = new Portfolio({});
    }

    portfolio.messages.push(req.body);
    await portfolio.save();

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages (admin only)
router.get('/messages', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    res.json({ success: true, data: portfolio?.messages || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark message as read
router.put('/messages/:id/read', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    const message = portfolio.messages.id(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.read = true;
    await portfolio.save();

    res.json({ success: true, data: portfolio.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete message
router.delete('/messages/:id', auth, async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    portfolio.messages.id(req.params.id).remove();
    await portfolio.save();

    res.json({ success: true, data: portfolio.messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;