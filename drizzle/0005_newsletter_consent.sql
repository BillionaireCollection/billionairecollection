-- Records when a visitor actively opted into newsletter marketing.
-- Additive only: existing subscribers receive the migration timestamp as a neutral baseline.
ALTER TABLE `newsletter_subscribers`
  ADD COLUMN `marketingConsentAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
