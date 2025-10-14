import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Alert,
  Snackbar,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Badge,
  Switch,
  FormControlLabel
} from '@mui/material';
import {
  Send,
  Delete,
  Notifications,
  History,
  MarkEmailRead,
  Groups,
  Person
} from '@mui/icons-material';
import { adminApi } from '../../services/api';

const AdminNotificationsPage = () => {
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: 'INFO',
    target: 'ALL',
    is_urgent: false
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [sentNotifications, setSentNotifications] = useState([]);
  const [userStats, setUserStats] = useState({ total: 0, buyers: 0, sellers: 0 });
  const [showHistory, setShowHistory] = useState(true);

  // Charger les statistiques utilisateurs et l'historique
  useEffect(() => {
    loadUserStats();
    loadNotificationHistory();
  }, []);

  const loadUserStats = async () => {
    try {
      const response = await adminApi.get('/admin/users/stats');
      setUserStats(response.data);
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    }
  };

  const loadNotificationHistory = async () => {
    try {
      const response = await adminApi.get('/admin/notifications/history');
      setSentNotifications(response.data.notifications || []);
    } catch (error) {
      console.error('Erreur chargement historique:', error);
    }
  };

  const handleSendNotification = async () => {
    if (!notification.title || !notification.message) {
      setSnackbar({
        open: true,
        message: 'Veuillez remplir le titre et le message',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        title: notification.title,
        message: notification.message,
        type: notification.type,
        target: notification.target,
        is_urgent: notification.is_urgent
      };

      await adminApi.post('/admin/notifications/send-bulk', payload);
      
      setSnackbar({
        open: true,
        message: 'Notification envoyée avec succès!',
        severity: 'success'
      });
      
      // Réinitialiser le formulaire
      setNotification({
        title: '',
        message: '',
        type: 'INFO',
        target: 'ALL',
        is_urgent: false
      });
      
      // Recharger l'historique
      loadNotificationHistory();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'Erreur lors de l\'envoi de la notification',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await adminApi.delete(`/admin/notifications/${notificationId}`);
      setSnackbar({
        open: true,
        message: 'Notification supprimée',
        severity: 'success'
      });
      loadNotificationHistory();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la suppression',
        severity: 'error'
      });
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      INFO: 'primary',
      WARNING: 'warning',
      URGENT: 'error'
    };
    return colors[type] || 'default';
  };

  const getTargetLabel = (target) => {
    const labels = {
      ALL: `Tous les utilisateurs (${userStats.total})`,
      BUYERS: `Acheteurs uniquement (${userStats.buyers})`,
      SELLERS: `Vendeurs uniquement (${userStats.sellers})`
    };
    return labels[target] || target;
  };

  const getStatsByTarget = (target) => {
    switch (target) {
      case 'ALL': return userStats.total;
      case 'BUYERS': return userStats.buyers;
      case 'SELLERS': return userStats.sellers;
      default: return 0;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <Notifications /> Centre de Notifications Admin
      </Typography>

      <Grid container spacing={3}>
        {/* Formulaire d'envoi */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Send /> Nouvelle Notification
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Titre de la notification *"
                  value={notification.title}
                  onChange={(e) => setNotification({...notification, title: e.target.value})}
                  fullWidth
                  placeholder="Ex: Maintenance programmée"
                />
                
                <TextField
                  label="Message *"
                  value={notification.message}
                  onChange={(e) => setNotification({...notification, message: e.target.value})}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Ex: Le site sera indisponible le..."
                />
                
                <FormControl fullWidth>
                  <InputLabel>Type de notification</InputLabel>
                  <Select
                    value={notification.type}
                    label="Type de notification"
                    onChange={(e) => setNotification({...notification, type: e.target.value})}
                  >
                    <MenuItem value="INFO">
                      <Chip label="Information" size="small" color="primary" />
                    </MenuItem>
                    <MenuItem value="WARNING">
                      <Chip label="Avertissement" size="small" color="warning" />
                    </MenuItem>
                    <MenuItem value="URGENT">
                      <Chip label="Urgent" size="small" color="error" />
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Destinataires</InputLabel>
                  <Select
                    value={notification.target}
                    label="Destinataires"
                    onChange={(e) => setNotification({...notification, target: e.target.value})}
                  >
                    <MenuItem value="ALL">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Groups />
                        <span>Tous les utilisateurs ({userStats.total})</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="BUYERS">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person />
                        <span>Acheteurs uniquement ({userStats.buyers})</span>
                      </Box>
                    </MenuItem>
                    <MenuItem value="SELLERS">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person />
                        <span>Vendeurs uniquement ({userStats.sellers})</span>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Switch
                      checked={notification.is_urgent}
                      onChange={(e) => setNotification({...notification, is_urgent: e.target.checked})}
                      color="error"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Badge color="error" variant="dot">
                        <Typography>Notification urgente</Typography>
                      </Badge>
                    </Box>
                  }
                />

                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    📊 Cette notification sera envoyée à <strong>{getStatsByTarget(notification.target)}</strong> utilisateur(s)
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  startIcon={<Send />}
                  onClick={handleSendNotification}
                  disabled={loading || !notification.title || !notification.message}
                  sx={{ alignSelf: 'flex-start' }}
                  size="large"
                >
                  {loading ? 'Envoi en cours...' : `Envoyer à ${getStatsByTarget(notification.target)} utilisateur(s)`}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistiques et historique */}
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📈 Statistiques Utilisateurs
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'primary.light', color: 'white' }}>
                    <Typography variant="h6">{userStats.total}</Typography>
                    <Typography variant="body2">Total</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'success.light', color: 'white' }}>
                    <Typography variant="h6">{userStats.buyers}</Typography>
                    <Typography variant="body2">Acheteurs</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={4}>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'warning.light', color: 'white' }}>
                    <Typography variant="h6">{userStats.sellers}</Typography>
                    <Typography variant="body2">Vendeurs</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <History /> Historique des Notifications
            </Typography>
            <Button
              onClick={() => setShowHistory(!showHistory)}
              size="small"
            >
              {showHistory ? 'Masquer' : 'Afficher'}
            </Button>
          </Box>

          {showHistory && (
            <Card>
              <CardContent>
                {sentNotifications.length === 0 ? (
                  <Typography color="textSecondary" textAlign="center" py={3}>
                    Aucune notification envoyée
                  </Typography>
                ) : (
                  <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                    {sentNotifications.map((notif) => (
                      <ListItem
                        key={notif.id}
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            onClick={() => handleDeleteNotification(notif.id)}
                            color="error"
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        }
                        sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {notif.title}
                              </Typography>
                              <Chip 
                                label={notif.type} 
                                size="small" 
                                color={getTypeColor(notif.type)}
                              />
                              {notif.is_urgent && (
                                <Chip 
                                  label="URGENT" 
                                  size="small" 
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                {notif.message}
                              </Typography>
                              <Typography variant="caption" color="textSecondary">
                                📧 {getTargetLabel(notif.target)} • 
                                📅 {new Date(notif.created_at).toLocaleString()} • 
                                👥 {notif.recipient_count} destinataire(s)
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminNotificationsPage;
