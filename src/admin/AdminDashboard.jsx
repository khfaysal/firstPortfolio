import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  getDocs, query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import {
  FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaSave, FaTimes,
  FaStar, FaBriefcase, FaProjectDiagram, FaCloudUploadAlt,
} from 'react-icons/fa';

// Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = 'dxj8esfzy';
const CLOUDINARY_UPLOAD_PRESET = 'desPortfolio'; // User's custom unsigned preset

// ─── Empty form defaults ────────────────────────────────────────────
const emptyProject = {
  title: '',
  description: '',
  category: '',
  tags: '',
  thumbnail: '',
  screenshots: '',
  githubLink: '',
  liveLink: '',
  featured: false,
  order: 0,
};

const emptyExperience = {
  role: '',
  company: '',
  period: '',
  description: '',
  skills: '',
  order: 0,
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active tab: 'projects' or 'experience'
  const [activeTab, setActiveTab] = useState('projects');

  // ─── Projects state ─────────────────────────────────────────────
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // ─── Experience state ───────────────────────────────────────────
  const [experiences, setExperiences] = useState([]);
  const [expForm, setExpForm] = useState(emptyExperience);
  const [editingExpId, setEditingExpId] = useState(null);
  const [showExpForm, setShowExpForm] = useState(false);

  // ─── Shared state ───────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState('');

  // ─── Fetch data ─────────────────────────────────────────────────
  const fetchProjects = async () => {
    try {
      const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching projects:', err);
    }
  };

  const fetchExperiences = async () => {
    try {
      const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setExperiences(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error('Error fetching experiences:', err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      await Promise.all([fetchProjects(), fetchExperiences()]);
      setLoading(false);
    };
    loadAll();
  }, []);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin');
  };

  // ─── Cloudinary Image Upload Handler ─────────────────────────────
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to upload image');
      const data = await res.json();
      // Ensure we use https secure URL format
      const secureUrl = data.secure_url || data.url;
      return secureUrl.replace(/^http:/, 'https:');
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      throw err;
    }
  };

  // Handle Thumbnail File Picker Change
  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setProjectForm((prev) => ({ ...prev, thumbnail: url }));
      showNotif('Thumbnail uploaded successfully!');
    } catch {
      showNotif('Failed to upload thumbnail to Cloudinary.');
    } finally {
      setUploading(false);
    }
  };

  // Handle Gallery Screenshots File Pickers
  const handleScreenshotsUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      // Limit to 10 images and resolve all uploads in parallel
      const uploadPromises = files.slice(0, 10).map(file => uploadImageToCloudinary(file));
      const urls = await Promise.all(uploadPromises);
      
      let currentScreenshots = [];
      if (projectForm.screenshots) {
        if (Array.isArray(projectForm.screenshots)) {
          currentScreenshots = projectForm.screenshots;
        } else if (typeof projectForm.screenshots === 'string') {
          currentScreenshots = projectForm.screenshots.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
      
      const combined = [...currentScreenshots, ...urls].slice(0, 10);
      const screenshotsString = combined.join(', ');
      console.log('Saved Cloudinary URLs to state string:', screenshotsString);
      setProjectForm((prev) => ({ ...prev, screenshots: screenshotsString }));
      showNotif('Screenshots uploaded successfully!');
    } catch (err) {
      console.error('Error during screenshots upload process:', err);
      showNotif('Error uploading screenshots.');
    } finally {
      setUploading(false);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  //  PROJECTS CRUD
  // ═══════════════════════════════════════════════════════════════
  const handleProjectChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProjectForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;
    setSaving(true);
    try {
      const data = {
        ...projectForm,
        tags: typeof projectForm.tags === 'string'
          ? projectForm.tags.split(',').map(t => t.trim()).filter(Boolean)
          : projectForm.tags,
        screenshots: typeof projectForm.screenshots === 'string'
          ? projectForm.screenshots.split(',').map(s => s.trim()).filter(Boolean).slice(0, 10)
          : projectForm.screenshots,
        order: Number(projectForm.order) || 0,
        updatedAt: serverTimestamp(),
      };
      if (editingProjectId) {
        await updateDoc(doc(db, 'projects', editingProjectId), data);
        showNotif('Project updated!');
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, 'projects'), data);
        showNotif('Project added!');
      }
      setProjectForm(emptyProject);
      setEditingProjectId(null);
      setShowProjectForm(false);
      await fetchProjects();
    } catch (err) {
      console.error('Error saving project:', err);
      showNotif('Error saving project.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditProject = (p) => {
    setProjectForm({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      screenshots: Array.isArray(p.screenshots) ? p.screenshots.join(', ') : p.screenshots || '',
    });
    setEditingProjectId(p.id);
    setShowProjectForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
      showNotif('Project deleted!');
      await fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
    }
  };

  const cancelProjectForm = () => {
    setProjectForm(emptyProject);
    setEditingProjectId(null);
    setShowProjectForm(false);
  };

  // ═══════════════════════════════════════════════════════════════
  //  EXPERIENCE CRUD
  // ═══════════════════════════════════════════════════════════════
  const handleExpChange = (e) => {
    const { name, value } = e.target;
    setExpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleExpSubmit = async (e) => {
    e.preventDefault();
    if (!expForm.role.trim()) return;
    setSaving(true);
    try {
      const data = {
        ...expForm,
        skills: typeof expForm.skills === 'string'
          ? expForm.skills.split(',').map(t => t.trim()).filter(Boolean)
          : expForm.skills,
        order: Number(expForm.order) || 0,
        updatedAt: serverTimestamp(),
      };
      if (editingExpId) {
        await updateDoc(doc(db, 'experiences', editingExpId), data);
        showNotif('Experience updated!');
      } else {
        data.createdAt = serverTimestamp();
        await addDoc(collection(db, 'experiences'), data);
        showNotif('Experience added!');
      }
      setExpForm(emptyExperience);
      setEditingExpId(null);
      setShowExpForm(false);
      await fetchExperiences();
    } catch (err) {
      console.error('Error saving experience:', err);
      showNotif('Error saving experience.');
    } finally {
      setSaving(false);
    }
  };

  const handleEditExp = (exp) => {
    setExpForm({
      ...exp,
      skills: Array.isArray(exp.skills) ? exp.skills.join(', ') : exp.skills || '',
    });
    setEditingExpId(exp.id);
    setShowExpForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try {
      await deleteDoc(doc(db, 'experiences', id));
      showNotif('Experience deleted!');
      await fetchExperiences();
    } catch (err) {
      console.error('Error deleting experience:', err);
    }
  };

  const cancelExpForm = () => {
    setExpForm(emptyExperience);
    setEditingExpId(null);
    setShowExpForm(false);
  };

  // ═══════════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════════
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-bg-primary"
    >
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-purple-primary/20 border border-purple-primary/40 backdrop-blur-xl rounded-xl px-6 py-3"
          >
            <p className="text-purple-light text-sm font-medium">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Header ──────────────────────────────────────────────── */}
      <header className="glass border-b border-border-default sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-purple flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-white">KH</span>
            </div>
            <div>
              <h1 className="text-text-primary font-heading font-bold text-lg">Admin Dashboard</h1>
              <p className="text-text-muted text-xs">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="px-4 py-2 rounded-xl text-text-secondary text-sm hover:text-text-primary transition-colors">
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-default text-text-secondary text-sm hover:border-red-500/40 hover:text-red-400 transition-all"
            >
              <FaSignOutAlt size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* ─── Tabs ──────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-8 p-1 bg-bg-card rounded-2xl w-fit border border-border-default">
          <button
            onClick={() => { setActiveTab('projects'); setShowExpForm(false); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'projects'
                ? 'bg-gradient-purple text-white shadow-lg shadow-purple-primary/20'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FaProjectDiagram size={14} />
            Projects
          </button>
          <button
            onClick={() => { setActiveTab('experience'); setShowProjectForm(false); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === 'experience'
                ? 'bg-gradient-purple text-white shadow-lg shadow-purple-primary/20'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FaBriefcase size={14} />
            Experience
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-purple-primary/30 border-t-purple-primary rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* ═══════════════════════════════════════════════════════
                PROJECTS TAB
            ═══════════════════════════════════════════════════════ */}
            {activeTab === 'projects' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Action Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-text-primary font-heading font-bold text-2xl">Projects</h2>
                    <p className="text-text-muted text-sm mt-1">{projects.length} project{projects.length !== 1 ? 's' : ''}</p>
                  </div>
                  {!showProjectForm && (
                    <button
                      onClick={() => { setShowProjectForm(true); setEditingProjectId(null); setProjectForm(emptyProject); }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-primary/30 transition-all"
                    >
                      <FaPlus size={14} />
                      Add Project
                    </button>
                  )}
                </div>

                {/* Project Form */}
                <AnimatePresence>
                  {showProjectForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 overflow-hidden"
                    >
                      <form onSubmit={handleProjectSubmit} className="glass-card rounded-2xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-text-primary font-heading font-semibold text-lg">
                            {editingProjectId ? 'Edit Project' : 'New Project'}
                          </h3>
                          <button type="button" onClick={cancelProjectForm} className="text-text-muted hover:text-text-primary transition-colors">
                            <FaTimes size={18} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InputField label="Title *" name="title" value={projectForm.title} onChange={handleProjectChange} placeholder="Project name" required />
                          <InputField label="Category" name="category" value={projectForm.category} onChange={handleProjectChange} placeholder="e.g. Web Design & Development" />
                          
                          <div className="md:col-span-2">
                            <TextareaField label="Description" name="description" value={projectForm.description} onChange={handleProjectChange} placeholder="Brief description..." />
                          </div>
                          
                          {/* Thumbnail Upload & URL */}
                          <div className="flex flex-col gap-2">
                            <label className="block text-text-secondary text-xs uppercase tracking-wider font-medium">Thumbnail Image</label>
                            <div className="flex gap-3">
                              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-default bg-bg-elevated hover:border-purple-primary/40 text-text-secondary hover:text-text-primary text-xs transition-all cursor-pointer">
                                <FaCloudUploadAlt size={16} />
                                {uploading ? 'Uploading...' : 'Choose File'}
                                <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} disabled={uploading} />
                              </label>
                              <input
                                name="thumbnail"
                                value={projectForm.thumbnail || ''}
                                onChange={handleProjectChange}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-bg-elevated/40 border border-border-default text-text-primary text-xs focus:border-purple-primary/50 focus:outline-none transition-colors"
                                placeholder="Or paste image URL"
                              />
                            </div>
                            {projectForm.thumbnail && (
                              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-border-default">
                                <img src={projectForm.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                              </div>
                            )}
                          </div>

                          <InputField label="Tech Tags" name="tags" value={projectForm.tags} onChange={handleProjectChange} placeholder="React, Node.js (comma separated)" />
                          
                          {/* Screenshots Upload & URL */}
                          <div className="md:col-span-2 flex flex-col gap-2">
                            <label className="block text-text-secondary text-xs uppercase tracking-wider font-medium">Screenshots / Gallery (Max 10)</label>
                            <div className="flex flex-col sm:flex-row gap-3">
                              <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-default bg-bg-elevated hover:border-purple-primary/40 text-text-secondary hover:text-text-primary text-xs transition-all cursor-pointer shrink-0">
                                <FaCloudUploadAlt size={16} />
                                {uploading ? 'Uploading...' : 'Upload Files'}
                                <input type="file" accept="image/*" multiple className="hidden" onChange={handleScreenshotsUpload} disabled={uploading} />
                              </label>
                              <input
                                name="screenshots"
                                value={Array.isArray(projectForm.screenshots) ? projectForm.screenshots.join(', ') : projectForm.screenshots || ''}
                                onChange={handleProjectChange}
                                className="flex-1 px-4 py-2.5 rounded-xl bg-bg-elevated/40 border border-border-default text-text-primary text-xs focus:border-purple-primary/50 focus:outline-none transition-colors"
                                placeholder="Comma separated URLs"
                              />
                            </div>
                            {projectForm.screenshots && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {(Array.isArray(projectForm.screenshots) 
                                  ? projectForm.screenshots 
                                  : typeof projectForm.screenshots === 'string'
                                    ? projectForm.screenshots.split(',').map(s => s.trim()).filter(Boolean)
                                    : []
                                ).map((url, idx) => (
                                  <div key={idx} className="relative w-16 h-12 rounded-lg overflow-hidden border border-border-default group">
                                    <img src={url} alt={`Screenshot Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <InputField label="GitHub Link" name="githubLink" value={projectForm.githubLink} onChange={handleProjectChange} placeholder="https://github.com/..." />
                          <InputField label="Live Link" name="liveLink" value={projectForm.liveLink} onChange={handleProjectChange} placeholder="https://..." />
                          <InputField label="Display Order" name="order" type="number" value={projectForm.order} onChange={handleProjectChange} placeholder="1" />
                          
                          <div className="flex items-center gap-3">
                            <input
                              name="featured"
                              type="checkbox"
                              checked={projectForm.featured}
                              onChange={handleProjectChange}
                              className="w-5 h-5 rounded border-border-default bg-bg-elevated accent-purple-primary"
                            />
                            <label className="text-text-secondary text-sm">
                              <FaStar className="inline text-purple-primary mr-1" size={12} />
                              Mark as Featured (shown on homepage)
                            </label>
                          </div>
                        </div>
                        <FormActions saving={saving} editing={!!editingProjectId} onCancel={cancelProjectForm} entityName="Project" />
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Project List */}
                {projects.length === 0 ? (
                  <EmptyState text="No projects yet" sub='Click "Add Project" to create your first project.' />
                ) : (
                  <div className="space-y-4">
                    {projects.map((project, i) => (
                      <ListItem
                        key={project.id}
                        index={i}
                        title={project.title}
                        subtitle={project.category}
                        tags={Array.isArray(project.tags) ? project.tags : []}
                        order={project.order}
                        featured={project.featured}
                        thumbnail={project.thumbnail}
                        onEdit={() => handleEditProject(project)}
                        onDelete={() => handleDeleteProject(project.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* ═══════════════════════════════════════════════════════
                EXPERIENCE TAB
            ═══════════════════════════════════════════════════════ */}
            {activeTab === 'experience' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Action Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-text-primary font-heading font-bold text-2xl">Experience</h2>
                    <p className="text-text-muted text-sm mt-1">{experiences.length} entr{experiences.length !== 1 ? 'ies' : 'y'}</p>
                  </div>
                  {!showExpForm && (
                    <button
                      onClick={() => { setShowExpForm(true); setEditingExpId(null); setExpForm(emptyExperience); }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-primary/30 transition-all"
                    >
                      <FaPlus size={14} />
                      Add Experience
                    </button>
                  )}
                </div>

                {/* Experience Form */}
                <AnimatePresence>
                  {showExpForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-8 overflow-hidden"
                    >
                      <form onSubmit={handleExpSubmit} className="glass-card rounded-2xl p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-text-primary font-heading font-semibold text-lg">
                            {editingExpId ? 'Edit Experience' : 'New Experience'}
                          </h3>
                          <button type="button" onClick={cancelExpForm} className="text-text-muted hover:text-text-primary transition-colors">
                            <FaTimes size={18} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <InputField label="Role / Job Title *" name="role" value={expForm.role} onChange={handleExpChange} placeholder="e.g. Frontend Developer" required />
                          <InputField label="Company" name="company" value={expForm.company} onChange={handleExpChange} placeholder="e.g. Google, Freelance" />
                          <InputField label="Period" name="period" value={expForm.period} onChange={handleExpChange} placeholder="e.g. Jan 2025 — Present" />
                          <InputField label="Skills" name="skills" value={expForm.skills} onChange={handleExpChange} placeholder="React, Node.js (comma separated)" />
                          <div className="md:col-span-2">
                            <TextareaField label="Description" name="description" value={expForm.description} onChange={handleExpChange} placeholder="What you did in this role..." />
                          </div>
                          <InputField label="Display Order" name="order" type="number" value={expForm.order} onChange={handleExpChange} placeholder="1" />
                        </div>
                        <FormActions saving={saving} editing={!!editingExpId} onCancel={cancelExpForm} entityName="Experience" />
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Experience List */}
                {experiences.length === 0 ? (
                  <EmptyState text="No experience entries yet" sub='Click "Add Experience" to add your work history.' />
                ) : (
                  <div className="space-y-4">
                    {experiences.map((exp, i) => (
                      <ListItem
                        key={exp.id}
                        index={i}
                        title={exp.role}
                        subtitle={`${exp.company || ''} ${exp.period ? `• ${exp.period}` : ''}`}
                        tags={Array.isArray(exp.skills) ? exp.skills : []}
                        order={exp.order}
                        onEdit={() => handleEditExp(exp)}
                        onDelete={() => handleDeleteExp(exp.id)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </main>
    </motion.div>
  );
};

// ─── Reusable sub-components ──────────────────────────────────────

const InputField = ({ label, name, value, onChange, placeholder, type = 'text', required = false }) => (
  <div>
    <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2 font-medium">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border-default text-text-primary text-sm focus:border-purple-primary/50 focus:outline-none transition-colors"
      placeholder={placeholder}
    />
  </div>
);

const TextareaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-text-secondary text-xs uppercase tracking-wider mb-2 font-medium">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-3 rounded-xl bg-bg-elevated border border-border-default text-text-primary text-sm focus:border-purple-primary/50 focus:outline-none transition-colors resize-none"
      placeholder={placeholder}
    />
  </div>
);

const FormActions = ({ saving, editing, onCancel, entityName }) => (
  <div className="flex gap-3 mt-6 pt-6 border-t border-border-default">
    <button
      type="submit"
      disabled={saving}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-purple text-white font-medium text-sm hover:shadow-lg hover:shadow-purple-primary/30 transition-all disabled:opacity-50"
    >
      <FaSave size={14} />
      {saving ? 'Saving...' : editing ? `Update ${entityName}` : `Add ${entityName}`}
    </button>
    <button
      type="button"
      onClick={onCancel}
      className="px-6 py-2.5 rounded-xl border border-border-default text-text-secondary text-sm hover:text-text-primary transition-colors"
    >
      Cancel
    </button>
  </div>
);

const EmptyState = ({ text, sub }) => (
  <div className="glass-card rounded-2xl p-12 text-center">
    <p className="text-text-muted text-lg mb-2">{text}</p>
    <p className="text-text-muted text-sm">{sub}</p>
  </div>
);

const ListItem = ({ index, title, subtitle, tags, order, featured, thumbnail, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.04 }}
    className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group hover:border-purple-primary/20 transition-all"
  >
    {/* Thumbnail / Number */}
    <div className="w-14 h-14 rounded-xl bg-bg-elevated border border-border-default overflow-hidden shrink-0 flex items-center justify-center">
      {thumbnail ? (
        <img src={thumbnail} alt="" className="w-full h-full object-cover" />
      ) : (
        <span className="text-lg font-heading font-bold text-purple-primary/30">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </div>

    {/* Info */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <h4 className="text-text-primary font-semibold text-sm truncate">{title}</h4>
        {featured && <FaStar size={10} className="text-purple-primary shrink-0" />}
      </div>
      <p className="text-text-muted text-xs mt-0.5 truncate">{subtitle}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.slice(0, 5).map((tag, j) => (
            <span key={j} className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-purple-primary/10 text-purple-light border border-purple-primary/15">
              {tag}
            </span>
          ))}
          {tags.length > 5 && (
            <span className="px-2 py-0.5 text-[9px] font-mono rounded-full bg-bg-elevated text-text-muted">
              +{tags.length - 5}
            </span>
          )}
        </div>
      )}
    </div>

    {/* Actions */}
    <div className="flex items-center gap-2 shrink-0">
      <span className="text-text-muted text-xs font-mono mr-2">#{order || 0}</span>
      <button
        onClick={onEdit}
        className="w-9 h-9 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted hover:text-purple-primary hover:border-purple-primary/30 transition-all"
        title="Edit"
      >
        <FaEdit size={14} />
      </button>
      <button
        onClick={onDelete}
        className="w-9 h-9 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center text-text-muted hover:text-red-400 hover:border-red-500/30 transition-all"
        title="Delete"
      >
        <FaTrash size={13} />
      </button>
    </div>
  </motion.div>
);

export default AdminDashboard;
