import express from 'express';

import {authorizeRoles, isAuthenticated} from '../middleware/auth.js';
import {
    getAdminNotifications,
    updateNotification,
}
from '../controllers/notification.controller.js';

const notificationRoute = express.Router();

notificationRoute.get('/admin/get-all-notifications',isAuthenticated, authorizeRoles('admin'),getAdminNotifications);

notificationRoute.put('/admin/update-notification/:id', isAuthenticated, authorizeRoles('admin'),updateNotification);

export default notificationRoute;
