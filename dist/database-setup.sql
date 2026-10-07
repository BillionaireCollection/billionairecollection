-- Billionaire Collection MySQL bootstrap generated from drizzle/schema.ts on 2026-10-07.
-- Contains schema-only CREATE TABLE statements. No credentials, data inserts or destructive statements.
CREATE TABLE `card_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`country` varchar(128),
	`occupation` varchar(255),
	`netWorth` varchar(128),
	`cardTier` enum('black','platinum','gold','golden_ticket') NOT NULL DEFAULT 'black',
	`referralCode` varchar(64),
	`status` enum('pending','reviewing','approved','rejected') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `card_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `concierge_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`requestType` varchar(128) NOT NULL,
	`description` text NOT NULL,
	`budget` varchar(128),
	`preferredDate` varchar(64),
	`status` enum('pending','in_progress','completed','cancelled') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `concierge_requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_enquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`division` varchar(128),
	`status` enum('new','read','replied','archived') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_enquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faculty_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`ventures` text,
	`journey` text,
	`linkedin` varchar(512),
	`source` varchar(128) DEFAULT 'billionairecollection.com/billionaire-tutor',
	`status` enum('new','reviewing','invited','rejected') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faculty_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `golden_ticket_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`country` varchar(128),
	`message` text,
	`referredBy` varchar(255),
	`status` enum('pending','reviewing','approved','rejected') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `golden_ticket_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `marketplace_listings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category` enum('estate','yacht','aviation','automotive','art','crypto','other') NOT NULL,
	`description` text,
	`price` decimal(18,2),
	`currency` varchar(8) DEFAULT 'USD',
	`location` varchar(255),
	`imageUrl` text,
	`contactEmail` varchar(320),
	`isActive` boolean NOT NULL DEFAULT true,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `marketplace_listings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `media_kit_download_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`asset` enum('media_kit','rate_card') NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `media_kit_download_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `membership_applications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(64),
	`country` varchar(128),
	`occupation` varchar(255),
	`company` varchar(255),
	`industry` varchar(255),
	`linkedIn` varchar(512),
	`capitalRange` varchar(128),
	`ecosystemInterests` text,
	`aspirations` text,
	`contribution` text,
	`personalIntro` text,
	`referralName` varchar(255),
	`referralEmail` varchar(320),
	`stripeSessionId` varchar(255),
	`paymentStatus` enum('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
	`amountPaid` int DEFAULT 0,
	`status` enum('submitted','reviewing','interview','approved','rejected','withdrawn') NOT NULL DEFAULT 'submitted',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `membership_applications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `merch_orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`printfulOrderId` varchar(64),
	`status` enum('pending','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
	`totalAmount` int NOT NULL,
	`items` text NOT NULL,
	`shippingAddress` text NOT NULL,
	`email` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `merch_orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `news_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(512) NOT NULL,
	`title` varchar(512) NOT NULL,
	`summary` text NOT NULL,
	`category` varchar(64) NOT NULL DEFAULT 'Wealth',
	`source` varchar(128) NOT NULL DEFAULT 'Billionaire Collection',
	`imageUrl` text,
	`articleUrl` text,
	`isFeatured` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `news_articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `news_articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `newsletter_subscribers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`name` varchar(255),
	`source` varchar(64) DEFAULT 'website',
	`marketingConsentAt` timestamp NOT NULL DEFAULT (now()),
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsletter_subscribers_id` PRIMARY KEY(`id`),
	CONSTRAINT `newsletter_subscribers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
