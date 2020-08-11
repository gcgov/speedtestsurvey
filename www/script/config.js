define( [], function () {

	return {
		//sign up here: https://geo.ipify.org/
		'ipifyApiKey': '',

		//if ipify returns incorrect IP addresses for any of your local ISPs you can manually override here - Garrett County, MD examples shown
		'ispOverride':[
			{
				name:'NeuBeam',
				ips:['204.111.96.4','204.111.96.5','204.111.96.6','204.111.96.7','204.111.96.16','204.111.96.17','204.111.96.18','204.111.96.19','204.111.96.20','204.111.96.21','204.111.96.22','204.111.96.23','204.111.96.24','204.111.96.25','204.111.96.26','204.111.96.27','204.111.96.28','204.111.96.29','204.111.96.30','204.111.96.31','204.111.96.36','204.111.96.37','204.111.96.38','204.111.96.39', '69.89.160.220', '69.89.160.221', '69.89.160.222', '69.89.160.223', '104.251.75.0', '104.251.75.1', '104.251.75.2', '104.251.75.3', '104.251.75.4', '104.251.75.5', '104.251.75.6', '104.251.75.7', '104.251.75.8', '104.251.75.9', '104.251.75.10', '104.251.75.11', '104.251.75.12', '104.251.75.13', '104.251.75.14', '104.251.75.15', '104.251.75.16', '104.251.75.17', '104.251.75.18', '104.251.75.19', '104.251.75.20', '104.251.75.21', '104.251.75.22', '104.251.75.23', '104.251.75.24', '104.251.75.25', '104.251.75.26', '104.251.75.27', '104.251.75.28', '104.251.75.29', '104.251.75.30', '104.251.75.31', '104.251.75.32', '104.251.75.33', '104.251.75.34', '104.251.75.35', '104.251.75.36', '104.251.75.37', '104.251.75.38', '104.251.75.39', '104.251.75.40', '104.251.75.41', '104.251.75.42', '104.251.75.43', '104.251.75.44', '104.251.75.45', '104.251.75.46', '104.251.75.47', '104.251.75.48', '104.251.75.49', '104.251.75.50', '104.251.75.51', '104.251.75.52', '104.251.75.53', '104.251.75.54', '104.251.75.55', '104.251.75.56', '104.251.75.57', '104.251.75.58', '104.251.75.59', '104.251.75.60', '104.251.75.61', '104.251.75.62', '104.251.75.63', '104.251.75.64', '104.251.75.65', '104.251.75.66', '104.251.75.67', '104.251.75.68', '104.251.75.69', '104.251.75.70', '104.251.75.71', '104.251.75.72', '104.251.75.73', '104.251.75.74', '104.251.75.75', '104.251.75.76', '104.251.75.77', '104.251.75.78', '104.251.75.79', '104.251.75.80', '104.251.75.81', '104.251.75.82', '104.251.75.83', '104.251.75.84', '104.251.75.85', '104.251.75.86', '104.251.75.87', '104.251.75.88', '104.251.75.89', '104.251.75.90', '104.251.75.91', '104.251.75.92', '104.251.75.93', '104.251.75.94', '104.251.75.95', '104.251.75.96', '104.251.75.97', '104.251.75.98', '104.251.75.99', '104.251.75.100', '104.251.75.101', '104.251.75.102', '104.251.75.103', '104.251.75.104', '104.251.75.105', '104.251.75.106', '104.251.75.107', '104.251.75.108', '104.251.75.109', '104.251.75.110', '104.251.75.111', '104.251.75.112', '104.251.75.113', '104.251.75.114', '104.251.75.115', '104.251.75.116', '104.251.75.117', '104.251.75.118', '104.251.75.119', '104.251.75.120', '104.251.75.121', '104.251.75.122', '104.251.75.123', '104.251.75.124', '104.251.75.125', '104.251.75.126', '104.251.75.127', '104.251.75.128', '104.251.75.129', '104.251.75.130', '104.251.75.131', '104.251.75.132', '104.251.75.133', '104.251.75.134', '104.251.75.135', '104.251.75.136', '104.251.75.137', '104.251.75.138', '104.251.75.139', '104.251.75.140', '104.251.75.141', '104.251.75.142', '104.251.75.143', '104.251.75.144', '104.251.75.145', '104.251.75.146', '104.251.75.147', '104.251.75.148', '104.251.75.149', '104.251.75.150', '104.251.75.151', '104.251.75.152', '104.251.75.153', '104.251.75.154', '104.251.75.155', '104.251.75.156', '104.251.75.157', '104.251.75.158', '104.251.75.159', '104.251.75.160', '104.251.75.161', '104.251.75.162', '104.251.75.163', '104.251.75.164', '104.251.75.165', '104.251.75.166', '104.251.75.167', '104.251.75.168', '104.251.75.169', '104.251.75.170', '104.251.75.171', '104.251.75.172', '104.251.75.173', '104.251.75.174', '104.251.75.175', '104.251.75.176', '104.251.75.177', '104.251.75.178', '104.251.75.179', '104.251.75.180', '104.251.75.181', '104.251.75.182', '104.251.75.183', '104.251.75.184', '104.251.75.185', '104.251.75.186', '104.251.75.187', '104.251.75.188', '104.251.75.189', '104.251.75.190', '104.251.75.191', '104.251.75.192', '104.251.75.193', '104.251.75.194', '104.251.75.195', '104.251.75.196', '104.251.75.197', '104.251.75.198', '104.251.75.199', '104.251.75.200', '104.251.75.201', '104.251.75.202', '104.251.75.203', '104.251.75.204', '104.251.75.205', '104.251.75.206', '104.251.75.207', '104.251.75.208', '104.251.75.209', '104.251.75.210', '104.251.75.211', '104.251.75.212', '104.251.75.213', '104.251.75.214', '104.251.75.215', '104.251.75.216', '104.251.75.217', '104.251.75.218', '104.251.75.219', '104.251.75.220', '104.251.75.221', '104.251.75.222', '104.251.75.223', '104.251.75.224', '104.251.75.225', '104.251.75.226', '104.251.75.227', '104.251.75.228', '104.251.75.229', '104.251.75.230', '104.251.75.231', '104.251.75.232', '104.251.75.233', '104.251.75.234', '104.251.75.235', '104.251.75.236', '104.251.75.237', '104.251.75.238', '104.251.75.239', '104.251.75.240', '104.251.75.241', '104.251.75.242', '104.251.75.243', '104.251.75.244', '104.251.75.245', '104.251.75.246', '104.251.75.247', '104.251.75.248', '104.251.75.249', '104.251.75.250', '104.251.75.251', '104.251.75.252', '104.251.75.253', '104.251.75.254', '104.251.75.255']
			},
			{
				name:'Proom',
				ips:['204.197.152.0','204.197.152.1','204.197.152.2','204.197.152.3','204.197.152.4','204.197.152.5','204.197.152.6','204.197.152.7','204.197.152.8','204.197.152.9','204.197.152.10','204.197.152.11','204.197.152.12','204.197.152.13','204.197.152.14','204.197.152.15','204.197.152.16','204.197.152.17','204.197.152.18','204.197.152.19','204.197.152.20','204.197.152.21','204.197.152.22','204.197.152.23','204.197.152.24','204.197.152.25','204.197.152.26','204.197.152.27','204.197.152.28','204.197.152.29','204.197.152.30','204.197.152.31','204.197.152.32','204.197.152.33','204.197.152.34','204.197.152.35','204.197.152.36','204.197.152.37','204.197.152.38','204.197.152.39','204.197.152.40','204.197.152.41','204.197.152.42','204.197.152.43','204.197.152.44','204.197.152.45','204.197.152.46','204.197.152.47','204.197.152.48','204.197.152.49','204.197.152.50','204.197.152.51','204.197.152.52','204.197.152.53','204.197.152.54','204.197.152.55','204.197.152.56','204.197.152.57','204.197.152.58','204.197.152.59','204.197.152.60','204.197.152.61','204.197.152.62','204.197.152.63','204.197.152.64','204.197.152.65','204.197.152.66','204.197.152.67','204.197.152.68','204.197.152.69','204.197.152.70','204.197.152.71','204.197.152.72','204.197.152.73','204.197.152.74','204.197.152.75','204.197.152.76','204.197.152.77','204.197.152.78','204.197.152.79','204.197.152.80','204.197.152.81','204.197.152.82','204.197.152.83','204.197.152.84','204.197.152.85','204.197.152.86','204.197.152.87','204.197.152.88','204.197.152.89','204.197.152.90','204.197.152.91','204.197.152.92','204.197.152.93','204.197.152.94','204.197.152.95','204.197.152.96','204.197.152.97','204.197.152.98','204.197.152.99','204.197.152.100','204.197.152.101','204.197.152.102','204.197.152.103','204.197.152.104','204.197.152.105','204.197.152.106','204.197.152.107','204.197.152.108','204.197.152.109','204.197.152.110','204.197.152.111','204.197.152.112','204.197.152.113','204.197.152.114','204.197.152.115','204.197.152.116','204.197.152.117','204.197.152.118','204.197.152.119','204.197.152.120','204.197.152.121','204.197.152.122','204.197.152.123','204.197.152.124','204.197.152.125','204.197.152.126','204.197.152.127','204.197.152.128','204.197.152.129','204.197.152.130','204.197.152.131','204.197.152.132','204.197.152.133','204.197.152.134','204.197.152.135','204.197.152.136','204.197.152.137','204.197.152.138','204.197.152.139','204.197.152.140','204.197.152.141','204.197.152.142','204.197.152.143','204.197.152.144','204.197.152.145','204.197.152.146','204.197.152.147','204.197.152.148','204.197.152.149','204.197.152.150','204.197.152.151','204.197.152.152','204.197.152.153','204.197.152.154','204.197.152.155','204.197.152.156','204.197.152.157','204.197.152.158','204.197.152.159','204.197.152.160','204.197.152.161','204.197.152.162','204.197.152.163','204.197.152.164','204.197.152.165','204.197.152.166','204.197.152.167','204.197.152.168','204.197.152.169','204.197.152.170','204.197.152.171','204.197.152.172','204.197.152.173','204.197.152.174','204.197.152.175','204.197.152.176','204.197.152.177','204.197.152.178','204.197.152.179','204.197.152.180','204.197.152.181','204.197.152.182','204.197.152.183','204.197.152.184','204.197.152.185','204.197.152.186','204.197.152.187','204.197.152.188','204.197.152.189','204.197.152.190','204.197.152.191','204.197.152.192','204.197.152.193','204.197.152.194','204.197.152.195','204.197.152.196','204.197.152.197','204.197.152.198','204.197.152.199','204.197.152.200','204.197.152.201','204.197.152.202','204.197.152.203','204.197.152.204','204.197.152.205','204.197.152.206','204.197.152.207','204.197.152.208','204.197.152.209','204.197.152.210','204.197.152.211','204.197.152.212','204.197.152.213','204.197.152.214','204.197.152.215','204.197.152.216','204.197.152.217','204.197.152.218','204.197.152.219','204.197.152.220','204.197.152.221','204.197.152.222','204.197.152.223','204.197.152.224','204.197.152.225','204.197.152.226','204.197.152.227','204.197.152.228','204.197.152.229','204.197.152.230','204.197.152.231','204.197.152.232','204.197.152.233','204.197.152.234','204.197.152.235','204.197.152.236','204.197.152.237','204.197.152.238','204.197.152.239','204.197.152.240','204.197.152.241','204.197.152.242','204.197.152.243','204.197.152.244','204.197.152.245','204.197.152.246','204.197.152.247','204.197.152.248','204.197.152.249','204.197.152.250','204.197.152.251','204.197.152.252','204.197.152.253','204.197.152.254','204.197.152.255','204.197.153.0','204.197.153.1','204.197.153.2','204.197.153.3','204.197.153.4','204.197.153.5','204.197.153.6','204.197.153.7','204.197.153.8','204.197.153.9','204.197.153.10','204.197.153.11','204.197.153.12','204.197.153.13','204.197.153.15','204.197.153.16','204.197.153.17','204.197.153.18','204.197.153.19','204.197.153.20','204.197.153.21','204.197.153.22','204.197.153.23','204.197.153.24','204.197.153.25','204.197.153.26','204.197.153.27','204.197.153.28','204.197.153.29','204.197.153.30','204.197.153.31','204.197.153.32','204.197.153.33','204.197.153.34','204.197.153.35','204.197.153.36','204.197.153.37','204.197.153.38','204.197.153.39','204.197.153.40','204.197.153.41','204.197.153.42','204.197.153.43','204.197.153.44','204.197.153.45','204.197.153.46','204.197.153.47','204.197.153.48','204.197.153.49','204.197.153.50','204.197.153.51','204.197.153.52','204.197.153.53','204.197.153.54','204.197.153.55','204.197.153.56','204.197.153.57','204.197.153.58','204.197.153.59','204.197.153.60','204.197.153.61','204.197.153.62','204.197.153.63','204.197.153.64','204.197.153.65','204.197.153.66','204.197.153.67','204.197.153.68','204.197.153.69','204.197.153.70','204.197.153.71','204.197.153.72','204.197.153.73','204.197.153.74','204.197.153.75','204.197.153.76','204.197.153.77','204.197.153.78','204.197.153.79','204.197.153.80','204.197.153.81','204.197.153.82','204.197.153.83','204.197.153.84','204.197.153.85','204.197.153.86','204.197.153.87','204.197.153.88','204.197.153.89','204.197.153.90','204.197.153.91','204.197.153.92','204.197.153.93','204.197.153.94','204.197.153.95','204.197.153.96','204.197.153.97','204.197.153.98','204.197.153.99','204.197.153.100','204.197.153.101','204.197.153.102','204.197.153.103','204.197.153.104','204.197.153.105','204.197.153.106','204.197.153.107','204.197.153.108','204.197.153.109','204.197.153.110','204.197.153.111','204.197.153.112','204.197.153.113','204.197.153.114','204.197.153.115','204.197.153.116','204.197.153.117','204.197.153.118','204.197.153.119','204.197.153.120','204.197.153.121','204.197.153.122','204.197.153.123','204.197.153.124','204.197.153.125','204.197.153.126','204.197.153.127','204.197.153.128','204.197.153.129','204.197.153.130','204.197.153.131','204.197.153.132','204.197.153.133','204.197.153.134','204.197.153.135','204.197.153.136','204.197.153.137','204.197.153.138','204.197.153.139','204.197.153.140','204.197.153.141','204.197.153.142','204.197.153.143','204.197.153.144','204.197.153.145','204.197.153.146','204.197.153.147','204.197.153.148','204.197.153.149','204.197.153.150','204.197.153.151','204.197.153.152','204.197.153.153','204.197.153.154','204.197.153.155','204.197.153.156','204.197.153.157','204.197.153.158','204.197.153.159','204.197.153.160','204.197.153.161','204.197.153.162','204.197.153.163','204.197.153.164','204.197.153.165','204.197.153.166','204.197.153.167','204.197.153.168','204.197.153.169','204.197.153.170','204.197.153.171','204.197.153.172','204.197.153.173','204.197.153.174','204.197.153.175','204.197.153.176','204.197.153.177','204.197.153.178','204.197.153.179','204.197.153.180','204.197.153.181','204.197.153.182','204.197.153.183','204.197.153.184','204.197.153.185','204.197.153.186','204.197.153.187','204.197.153.188','204.197.153.189','204.197.153.190','204.197.153.191','204.197.153.192','204.197.153.193','204.197.153.194','204.197.153.195','204.197.153.196','204.197.153.197','204.197.153.198','204.197.153.199','204.197.153.200','204.197.153.201','204.197.153.202','204.197.153.203','204.197.153.204','204.197.153.205','204.197.153.206','204.197.153.207','204.197.153.208','204.197.153.209','204.197.153.210','204.197.153.211','204.197.153.212','204.197.153.213','204.197.153.214','204.197.153.215','204.197.153.216','204.197.153.217','204.197.153.218','204.197.153.219','204.197.153.220','204.197.153.221','204.197.153.222','204.197.153.223','204.197.153.224','204.197.153.225','204.197.153.226','204.197.153.227','204.197.153.228','204.197.153.229','204.197.153.230','204.197.153.231','204.197.153.232','204.197.153.233','204.197.153.234','204.197.153.235','204.197.153.236','204.197.153.237','204.197.153.238','204.197.153.239','204.197.153.240','204.197.153.241','204.197.153.242','204.197.153.243','204.197.153.244','204.197.153.245','204.197.153.246','204.197.153.247','204.197.153.248','204.197.153.249','204.197.153.250','204.197.153.251','204.197.153.252','204.197.153.253','204.197.153.254','204.197.153.255','65.242.77.0','65.242.77.1','65.242.77.2','65.242.77.3','65.242.77.4','65.242.77.5','65.242.77.6','65.242.77.7','65.242.77.8','65.242.77.9','65.242.77.10','65.242.77.11','65.242.77.12','65.242.77.13','65.242.77.14','65.242.77.15','65.242.77.16','65.242.77.17','65.242.77.18','65.242.77.19','65.242.77.20','65.242.77.21','65.242.77.22','65.242.77.23','65.242.77.24','65.242.77.25','65.242.77.26','65.242.77.27','65.242.77.28','65.242.77.29','65.242.77.30','65.242.77.31','65.242.77.32','65.242.77.33','65.242.77.34','65.242.77.35','65.242.77.36','65.242.77.37','65.242.77.38','65.242.77.39','65.242.77.40','65.242.77.41','65.242.77.42','65.242.77.43','65.242.77.44','65.242.77.45','65.242.77.46','65.242.77.47','65.242.77.48','65.242.77.49','65.242.77.50','65.242.77.51','65.242.77.52','65.242.77.53','65.242.77.54','65.242.77.55','65.242.77.56','65.242.77.57','65.242.77.58','65.242.77.59','65.242.77.60','65.242.77.61','65.242.77.62','65.242.77.63','65.242.77.64','65.242.77.65','65.242.77.66','65.242.77.67','65.242.77.68','65.242.77.69','65.242.77.70','65.242.77.71','65.242.77.72','65.242.77.73','65.242.77.74','65.242.77.75','65.242.77.76','65.242.77.77','65.242.77.78','65.242.77.79','65.242.77.80','65.242.77.81','65.242.77.82','65.242.77.83','65.242.77.84','65.242.77.85','65.242.77.86','65.242.77.87','65.242.77.88','65.242.77.89','65.242.77.90','65.242.77.91','65.242.77.92','65.242.77.93','65.242.77.94','65.242.77.95','65.242.77.96','65.242.77.97','65.242.77.98','65.242.77.99','65.242.77.100','65.242.77.101','65.242.77.102','65.242.77.103','65.242.77.104','65.242.77.105','65.242.77.106','65.242.77.107','65.242.77.108','65.242.77.109','65.242.77.110','65.242.77.111','65.242.77.112','65.242.77.113','65.242.77.114','65.242.77.115','65.242.77.116','65.242.77.117','65.242.77.118','65.242.77.119','65.242.77.120','65.242.77.121','65.242.77.122','65.242.77.123','65.242.77.124','65.242.77.125','65.242.77.126','65.242.77.127','65.242.77.128','65.242.77.129','65.242.77.130','65.242.77.131','65.242.77.132','65.242.77.133','65.242.77.134','65.242.77.135','65.242.77.136','65.242.77.137','65.242.77.138','65.242.77.139','65.242.77.140','65.242.77.141','65.242.77.142','65.242.77.143','65.242.77.144','65.242.77.145','65.242.77.146','65.242.77.147','65.242.77.148','65.242.77.149','65.242.77.150','65.242.77.151','65.242.77.152','65.242.77.153','65.242.77.154','65.242.77.155','65.242.77.156','65.242.77.157','65.242.77.158','65.242.77.159','65.242.77.160','65.242.77.161','65.242.77.162','65.242.77.163','65.242.77.164','65.242.77.165','65.242.77.166','65.242.77.167','65.242.77.168','65.242.77.169','65.242.77.170','65.242.77.171','65.242.77.172','65.242.77.173','65.242.77.174','65.242.77.175','65.242.77.176','65.242.77.177','65.242.77.178','65.242.77.179','65.242.77.180','65.242.77.181','65.242.77.182','65.242.77.183','65.242.77.184','65.242.77.185','65.242.77.186','65.242.77.187','65.242.77.188','65.242.77.189','65.242.77.190','65.242.77.191','65.242.77.192','65.242.77.193','65.242.77.194','65.242.77.195','65.242.77.196','65.242.77.197','65.242.77.198','65.242.77.199','65.242.77.200','65.242.77.201','65.242.77.202','65.242.77.203','65.242.77.204','65.242.77.205','65.242.77.206','65.242.77.207','65.242.77.208','65.242.77.209','65.242.77.210','65.242.77.211','65.242.77.212','65.242.77.213','65.242.77.214','65.242.77.215','65.242.77.216','65.242.77.217','65.242.77.218','65.242.77.219','65.242.77.220','65.242.77.221','65.242.77.222','65.242.77.223','65.242.77.224','65.242.77.225','65.242.77.226','65.242.77.227','65.242.77.228','65.242.77.229','65.242.77.230','65.242.77.231','65.242.77.232','65.242.77.233','65.242.77.234','65.242.77.235','65.242.77.236','65.242.77.237','65.242.77.238','65.242.77.239','65.242.77.240','65.242.77.241','65.242.77.242','65.242.77.243','65.242.77.244','65.242.77.245','65.242.77.246','65.242.77.247','65.242.77.248','65.242.77.249','65.242.77.250','65.242.77.251','65.242.77.252','65.242.77.253','65.242.77.254','65.242.77.255','65.246.53.0','65.246.53.1','65.246.53.2','65.246.53.3','65.246.53.4','65.246.53.5','65.246.53.6','65.246.53.7','65.246.53.8','65.246.53.9','65.246.53.10','65.246.53.11','65.246.53.12','65.246.53.13','65.246.53.14','65.246.53.15','65.246.53.16','65.246.53.17','65.246.53.18','65.246.53.19','65.246.53.20','65.246.53.21','65.246.53.22','65.246.53.23','65.246.53.24','65.246.53.25','65.246.53.26','65.246.53.27','65.246.53.28','65.246.53.29','65.246.53.30','65.246.53.31','65.246.53.32','65.246.53.33','65.246.53.34','65.246.53.35','65.246.53.36','65.246.53.37','65.246.53.38','65.246.53.39','65.246.53.40','65.246.53.41','65.246.53.42','65.246.53.43','65.246.53.44','65.246.53.45','65.246.53.46','65.246.53.47','65.246.53.48','65.246.53.49','65.246.53.50','65.246.53.51','65.246.53.52','65.246.53.53','65.246.53.54','65.246.53.55','65.246.53.56','65.246.53.57','65.246.53.58','65.246.53.59','65.246.53.60','65.246.53.61','65.246.53.62','65.246.53.63','65.246.53.64','65.246.53.65','65.246.53.66','65.246.53.67','65.246.53.68','65.246.53.69','65.246.53.70','65.246.53.71','65.246.53.72','65.246.53.73','65.246.53.74','65.246.53.75','65.246.53.76','65.246.53.77','65.246.53.78','65.246.53.79','65.246.53.80','65.246.53.81','65.246.53.82','65.246.53.83','65.246.53.84','65.246.53.85','65.246.53.86','65.246.53.87','65.246.53.88','65.246.53.89','65.246.53.90','65.246.53.91','65.246.53.92','65.246.53.93','65.246.53.94','65.246.53.95','65.246.53.96','65.246.53.97','65.246.53.98','65.246.53.99','65.246.53.100','65.246.53.101','65.246.53.102','65.246.53.103','65.246.53.104','65.246.53.105','65.246.53.106','65.246.53.107','65.246.53.108','65.246.53.109','65.246.53.110','65.246.53.111','65.246.53.112','65.246.53.113','65.246.53.114','65.246.53.115','65.246.53.116','65.246.53.117','65.246.53.118','65.246.53.119','65.246.53.120','65.246.53.121','65.246.53.122','65.246.53.123','65.246.53.124','65.246.53.125','65.246.53.126','65.246.53.127','65.246.53.128','65.246.53.129','65.246.53.130','65.246.53.131','65.246.53.132','65.246.53.133','65.246.53.134','65.246.53.135','65.246.53.136','65.246.53.137','65.246.53.138','65.246.53.139','65.246.53.140','65.246.53.141','65.246.53.142','65.246.53.143','65.246.53.144','65.246.53.145','65.246.53.146','65.246.53.147','65.246.53.148','65.246.53.149','65.246.53.150','65.246.53.151','65.246.53.152','65.246.53.153','65.246.53.154','65.246.53.155','65.246.53.156','65.246.53.157','65.246.53.158','65.246.53.159','65.246.53.160','65.246.53.161','65.246.53.162','65.246.53.163','65.246.53.164','65.246.53.165','65.246.53.166','65.246.53.167','65.246.53.168','65.246.53.169','65.246.53.170','65.246.53.171','65.246.53.172','65.246.53.173','65.246.53.174','65.246.53.175','65.246.53.176','65.246.53.177','65.246.53.178','65.246.53.179','65.246.53.180','65.246.53.181','65.246.53.182','65.246.53.183','65.246.53.184','65.246.53.185','65.246.53.186','65.246.53.187','65.246.53.188','65.246.53.189','65.246.53.190','65.246.53.191','65.246.53.192','65.246.53.193','65.246.53.194','65.246.53.195','65.246.53.196','65.246.53.197','65.246.53.198','65.246.53.199','65.246.53.200','65.246.53.201','65.246.53.202','65.246.53.203','65.246.53.204','65.246.53.205','65.246.53.206','65.246.53.207','65.246.53.208','65.246.53.209','65.246.53.210','65.246.53.211','65.246.53.212','65.246.53.213','65.246.53.214','65.246.53.215','65.246.53.216','65.246.53.217','65.246.53.218','65.246.53.219','65.246.53.220','65.246.53.221','65.246.53.222','65.246.53.223','65.246.53.224','65.246.53.225','65.246.53.226','65.246.53.227','65.246.53.228','65.246.53.229','65.246.53.230','65.246.53.231','65.246.53.232','65.246.53.233','65.246.53.234','65.246.53.235','65.246.53.236','65.246.53.237','65.246.53.238','65.246.53.239','65.246.53.240','65.246.53.241','65.246.53.242','65.246.53.243','65.246.53.244','65.246.53.245','65.246.53.246','65.246.53.247','65.246.53.248','65.246.53.249','65.246.53.250','65.246.53.251','65.246.53.252','65.246.53.253','65.246.53.254','65.246.53.255','63.116.14.0','63.116.14.1','63.116.14.2','63.116.14.3','63.116.14.4','63.116.14.5','63.116.14.6','63.116.14.7','63.116.14.8','63.116.14.9','63.116.14.10','63.116.14.11','63.116.14.12','63.116.14.13','63.116.14.14','63.116.14.15','63.116.14.16','63.116.14.17','63.116.14.18','63.116.14.19','63.116.14.20','63.116.14.21','63.116.14.22','63.116.14.23','63.116.14.24','63.116.14.25','63.116.14.26','63.116.14.27','63.116.14.28','63.116.14.29','63.116.14.30','63.116.14.31','63.116.14.32','63.116.14.33','63.116.14.34','63.116.14.35','63.116.14.36','63.116.14.37','63.116.14.38','63.116.14.39','63.116.14.40','63.116.14.41','63.116.14.42','63.116.14.43','63.116.14.44','63.116.14.45','63.116.14.46','63.116.14.47','63.116.14.48','63.116.14.49','63.116.14.50','63.116.14.51','63.116.14.52','63.116.14.53','63.116.14.54','63.116.14.55','63.116.14.56','63.116.14.57','63.116.14.58','63.116.14.59','63.116.14.60','63.116.14.61','63.116.14.62','63.116.14.63','63.116.14.64','63.116.14.65','63.116.14.66','63.116.14.67','63.116.14.68','63.116.14.69','63.116.14.70','63.116.14.71','63.116.14.72','63.116.14.73','63.116.14.74','63.116.14.75','63.116.14.76','63.116.14.77','63.116.14.78','63.116.14.79','63.116.14.80','63.116.14.81','63.116.14.82','63.116.14.83','63.116.14.84','63.116.14.85','63.116.14.86','63.116.14.87','63.116.14.88','63.116.14.89','63.116.14.90','63.116.14.91','63.116.14.92','63.116.14.93','63.116.14.94','63.116.14.95','63.116.14.96','63.116.14.97','63.116.14.98','63.116.14.99','63.116.14.100','63.116.14.101','63.116.14.102','63.116.14.103','63.116.14.104','63.116.14.105','63.116.14.106','63.116.14.107','63.116.14.108','63.116.14.109','63.116.14.110','63.116.14.111','63.116.14.112','63.116.14.113','63.116.14.114','63.116.14.115','63.116.14.116','63.116.14.117','63.116.14.118','63.116.14.119','63.116.14.120','63.116.14.121','63.116.14.122','63.116.14.123','63.116.14.124','63.116.14.125','63.116.14.126','63.116.14.127','63.116.14.128','63.116.14.129','63.116.14.130','63.116.14.131','63.116.14.132','63.116.14.133','63.116.14.134','63.116.14.135','63.116.14.136','63.116.14.137','63.116.14.138','63.116.14.139','63.116.14.140','63.116.14.141','63.116.14.142','63.116.14.143','63.116.14.144','63.116.14.145','63.116.14.146','63.116.14.147','63.116.14.148','63.116.14.149','63.116.14.150','63.116.14.151','63.116.14.152','63.116.14.153','63.116.14.154','63.116.14.155','63.116.14.156','63.116.14.157','63.116.14.158','63.116.14.159','63.116.14.160','63.116.14.161','63.116.14.162','63.116.14.163','63.116.14.164','63.116.14.165','63.116.14.166','63.116.14.167','63.116.14.168','63.116.14.169','63.116.14.170','63.116.14.171','63.116.14.172','63.116.14.173','63.116.14.174','63.116.14.175','63.116.14.176','63.116.14.177','63.116.14.178','63.116.14.179','63.116.14.180','63.116.14.181','63.116.14.182','63.116.14.183','63.116.14.184','63.116.14.185','63.116.14.186','63.116.14.187','63.116.14.188','63.116.14.189','63.116.14.190','63.116.14.191','63.116.14.192','63.116.14.193','63.116.14.194','63.116.14.195','63.116.14.196','63.116.14.197','63.116.14.198','63.116.14.199','63.116.14.200','63.116.14.201','63.116.14.202','63.116.14.203','63.116.14.204','63.116.14.205','63.116.14.206','63.116.14.207','63.116.14.208','63.116.14.209','63.116.14.210','63.116.14.211','63.116.14.212','63.116.14.213','63.116.14.214','63.116.14.215','63.116.14.216','63.116.14.217','63.116.14.218','63.116.14.219','63.116.14.220','63.116.14.221','63.116.14.222','63.116.14.223','63.116.14.224','63.116.14.225','63.116.14.226','63.116.14.227','63.116.14.228','63.116.14.229','63.116.14.230','63.116.14.231','63.116.14.232','63.116.14.233','63.116.14.234','63.116.14.235','63.116.14.236','63.116.14.237','63.116.14.238','63.116.14.239','63.116.14.240','63.116.14.241','63.116.14.242','63.116.14.243','63.116.14.244','63.116.14.245','63.116.14.246','63.116.14.247','63.116.14.248','63.116.14.249','63.116.14.250','63.116.14.251','63.116.14.252','63.116.14.253','63.116.14.254','63.116.14.255']
			},
			{
				name:'Sommerfield',
				ips:['204.197.153.14']
			}
		],

		//public urls to hit speed test files - must be a full url to test path, cannot be relative to base
		'speedTestUrl': 'http://hostname/test/'

	};

});