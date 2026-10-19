-- This migration preserves every expense, receipt, payee, project, audit event and session.
-- It permanently removes only the obsolete expense-category association and Category table.
ALTER TABLE `Expense` DROP FOREIGN KEY `Expense_categoryId_fkey`;
ALTER TABLE `Expense` DROP COLUMN `categoryId`;
DROP TABLE `Category`;
