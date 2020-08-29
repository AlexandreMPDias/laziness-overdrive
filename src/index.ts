import "./config";
import iohook from 'iohook';
import * as service from './services'

service.InactivityDetector.init();
service.Macros.init();

iohook.start();
