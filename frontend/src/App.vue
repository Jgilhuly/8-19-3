<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="nav">
      <div class="container">
        <div class="nav-content">
          <div class="nav-brand">NeuraLink AI</div>
          <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </div>
          <button
            class="btn btn-secondary theme-toggle"
            @click="toggleTheme"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="container">
        <div class="text-center">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Business with 
            <span class="text-primary">AI Solutions</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 mx-auto">
            We help enterprises unlock the power of artificial intelligence through strategic consulting, 
            custom AI development, and intelligent automation solutions.
          </p>
          <div class="hero-buttons">
            <button class="btn btn-primary">Get Started</button>
            <button class="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="py-20 bg-white">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Our AI Services</h2>
          <p class="text-xl text-gray-600">Comprehensive AI solutions tailored to your business needs</p>
        </div>
        
        <div class="grid grid-3">
          <div 
            v-for="service in services" 
            :key="service.id"
            class="card hover-shadow"
          >
            <div class="text-4xl mb-4">{{ service.icon }}</div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
            <p class="text-gray-600">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section id="team" class="py-20 bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p class="text-xl text-gray-600">AI experts with deep industry experience</p>
        </div>
        
        <div class="grid grid-3">
          <div 
            v-for="member in team" 
            :key="member.id"
            class="card-white hover-shadow"
          >
            <div class="team-avatar">
              <span>{{ member.initials }}</span>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 text-center mb-2">{{ member.name }}</h3>
            <p class="text-primary text-center mb-3">{{ member.role }}</p>
            <p class="text-gray-600 text-center text-sm">{{ member.bio }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-white">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p class="text-xl text-gray-600">Ready to transform your business with AI?</p>
        </div>
        
        <div class="grid grid-3">
          <div class="contact-item">
            <div class="contact-icon">📧</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p class="text-gray-600">{{ contactInfo.email }}</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📞</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p class="text-gray-600">{{ contactInfo.phone }}</p>
          </div>
          <div class="contact-item">
            <div class="contact-icon">📍</div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <p class="text-gray-600">{{ contactInfo.location }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container text-center">
        <div class="text-2xl font-bold mb-4">NeuraLink AI</div>
        <p class="text-gray-400">© 2024 NeuraLink AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  name: 'App',
  setup() {
    const services = ref([])
    const team = ref([])
    const contactInfo = ref({})
    const isDark = ref(false)

    const applyTheme = () => {
      const root = document.documentElement
      if (isDark.value) {
        root.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        root.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    const toggleTheme = () => {
      isDark.value = !isDark.value
      applyTheme()
    }

    const fetchData = async () => {
      try {
        const [servicesRes, teamRes, contactRes] = await Promise.all([
          axios.get('/api/services'),
          axios.get('/api/team'),
          axios.get('/api/contact')
        ])
        
        services.value = servicesRes.data
        team.value = teamRes.data
        contactInfo.value = contactRes.data
      } catch (error) {
        console.error('Error fetching data:', error)
        // Fallback data in case API is not available
        services.value = [
          {
            id: 1,
            title: "AI Strategy Consulting",
            description: "Strategic roadmaps for AI adoption and digital transformation",
            icon: "🎯"
          },
          {
            id: 2,
            title: "Machine Learning Development",
            description: "Custom ML models and algorithms for your specific use cases",
            icon: "🤖"
          },
          {
            id: 3,
            title: "Process Automation",
            description: "Intelligent automation solutions to optimize your workflows",
            icon: "⚡"
          }
        ]
        
        team.value = [
          {
            id: 1,
            name: "Dr. Sarah Chen",
            role: "Chief AI Officer",
            bio: "PhD in Machine Learning, 10+ years in enterprise AI solutions",
            initials: "SC"
          },
          {
            id: 2,
            name: "Michael Rodriguez",
            role: "Lead Data Scientist",
            bio: "Expert in deep learning and computer vision applications",
            initials: "MR"
          },
          {
            id: 3,
            name: "Emily Johnson",
            role: "AI Solutions Architect",
            bio: "Specializes in scalable AI infrastructure and deployment",
            initials: "EJ"
          }
        ]
        
        contactInfo.value = {
          email: "contact@neuralink-ai.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA"
        }
      }
    }

    onMounted(() => {
      // Initialize theme preference
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
      }
      applyTheme()
      fetchData()
    })

    return {
      services,
      team,
      contactInfo,
      isDark,
      toggleTheme
    }
  }
}
</script>
