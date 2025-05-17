CREATE INDEX `idx_account_lookup` ON `account` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_member_userId` ON `member` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_member_organizationId` ON `member` (`organization_id`);--> statement-breakpoint
CREATE INDEX `idx_member_userId_organizationId` ON `member` (`user_id`,`organization_id`);--> statement-breakpoint
CREATE INDEX `idx_invitation_email` ON `invitation` (`email`);--> statement-breakpoint
CREATE INDEX `idx_invitation_organizationId` ON `invitation` (`organization_id`);--> statement-breakpoint
CREATE INDEX `idx_invitation_email_organizationId` ON `invitation` (`email`,`organization_id`);--> statement-breakpoint
CREATE INDEX `idx_organization_slug` ON `organization` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_session_userId` ON `session` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_session_token` ON `session` (`token`);--> statement-breakpoint
CREATE INDEX `idx_session_userId_token` ON `session` (`user_id`,`token`);--> statement-breakpoint
CREATE INDEX `idx_user_email` ON `user` (`email`);--> statement-breakpoint
CREATE INDEX `idx_verification_identifier` ON `verification` (`identifier`);