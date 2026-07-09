CREATE TABLE `tutor_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`wealthStage` varchar(255),
	`mentorGoal` text,
	`source` varchar(128) DEFAULT 'billionairecollection.com/billionaire-tutor',
	`status` enum('new','contacted','matched','closed') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tutor_leads_id` PRIMARY KEY(`id`)
);
