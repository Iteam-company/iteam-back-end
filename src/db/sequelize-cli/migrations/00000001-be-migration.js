"use strict";
const { Op } = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("allowed_registration_email", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("attachments", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      comment: { type: Sequelize.TEXT("long") },
      fileId: { type: Sequelize.INTEGER, allowNull: true },
      publisherId: { type: Sequelize.INTEGER, allowNull: true },
      userId: { type: Sequelize.INTEGER, allowNull: true },
      projectId: { type: Sequelize.INTEGER, allowNull: true },
      workHistoryInfoId: { type: Sequelize.INTEGER, allowNull: true },
      attachmentId: { type: Sequelize.INTEGER, allowNull: true },
    });
    await queryInterface.createTable("clients", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      link: { type: Sequelize.TEXT("medium") },
      communicationType: { type: Sequelize.TEXT("medium") },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("education-infos", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      startDate: { type: Sequelize.DATE, allowNull: true },
      endDate: { type: Sequelize.DATE, allowNull: true },
      universityName: { type: Sequelize.STRING, allowNull: true },
      specialization: { type: Sequelize.TEXT("medium"), allowNull: true },
      pricingModel: { type: Sequelize.ENUM("bachelor", "master") },
      userId: { type: Sequelize.INTEGER, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("files", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      originalName: { type: Sequelize.TEXT("long") },
      fileUrl: { type: Sequelize.TEXT("long") },
      mimetype: { type: Sequelize.TEXT("medium") },
      publicId: { type: Sequelize.TEXT("long") },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT("long") },
      teamSize: { type: Sequelize.TEXT("long") },
      ourCompanyResponsibility: { type: Sequelize.TEXT("long") },
      pricingModel: { type: Sequelize.ENUM("fixed price", "hourly rate") },
      averageHoursPerMonth: { type: Sequelize.FLOAT },
      hourlyRate: { type: Sequelize.FLOAT },
      fixedPrice: { type: Sequelize.FLOAT },
      userId: { type: Sequelize.INTEGER, allowNull: true },
      startDate: { type: Sequelize.DATE },
      endDate: { type: Sequelize.DATE },
      endReason: { type: Sequelize.TEXT("long") },
      status: { type: Sequelize.ENUM("active", "on hold", "closed") },
      clientId: { type: Sequelize.INTEGER, allowNull: true },
      projectDeploymentStatus: {
        type: Sequelize.ENUM(
          "deployed in production",
          "on development",
          "MVP released"
        ),
      },
      projectLink: { type: Sequelize.TEXT("medium") },
      demoCredentialsLogin: { type: Sequelize.TEXT("tiny") },
      demoCredentialsPassword: { type: Sequelize.TEXT("tiny") },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("roles", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      value: { type: Sequelize.STRING, unique: true, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("work_types", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      value: { type: Sequelize.STRING, unique: true, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("technologies", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: Sequelize.STRING, unique: true },
      description: { type: Sequelize.TEXT("long") },
      officialDocsHref: { type: Sequelize.TEXT("long") },
      icon: { type: Sequelize.TEXT("long") },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("tokens", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { type: Sequelize.INTEGER, allowNull: false },
      token: { type: Sequelize.TEXT, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      name: { type: Sequelize.STRING, allowNull: true },
      surname: { type: Sequelize.STRING, allowNull: true },
      positionDescription: { type: Sequelize.TEXT("long"), allowNull: true },
      language: { type: Sequelize.STRING, allowNull: true },
      endReason: { type: Sequelize.TEXT("long"), allowNull: true },
      avatarUrl: { type: Sequelize.TEXT("long"), allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: true },
      city: { type: Sequelize.STRING, allowNull: true },
      salary: { type: Sequelize.FLOAT, allowNull: true },
      address: { type: Sequelize.STRING, allowNull: true },
      skills: { type: Sequelize.TEXT("long"), allowNull: true },
      experience: { type: Sequelize.TEXT("long"), allowNull: true },
      isBanned: { type: Sequelize.BOOLEAN, allowNull: false },
      banReason: { type: Sequelize.STRING, allowNull: true },
      birthday: { type: Sequelize.DATE, allowNull: true },
      cvId: { type: Sequelize.INTEGER, allowNull: true },
      startDate: { type: Sequelize.DATE, allowNull: true },
      endDate: { type: Sequelize.DATE, allowNull: true },
      workTypeId: { type: Sequelize.INTEGER, allowNull: true },
      status: { type: Sequelize.ENUM("archived", "unarchived") },
      upwork: { type: Sequelize.TEXT("long"), allowNull: true },
      github: { type: Sequelize.TEXT("long"), allowNull: true },
      linkedin: { type: Sequelize.TEXT("long"), allowNull: true },
      telegramTag: { type: Sequelize.TEXT("long"), allowNull: true },
      individualEntrepreneurName: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      individualEntrepreneurAddress: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      individualEntrepreneurIndividualTaxNumber: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      individualEntrepreneurBankAccounNumber: {
        type: Sequelize.TEXT("medium"),
        allowNull: true,
      },
      individualEntrepreneurBankName: {
        type: Sequelize.TEXT("medium"),
        allowNull: true,
      },
      individualEntrepreneurBankCode: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      individualEntrepreneurBeneficiaryBank: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      individualEntrepreneurSwiftCode: {
        type: Sequelize.TEXT("long"),
        allowNull: true,
      },
      defaultCoverLetter: { type: Sequelize.TEXT("long"), allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("work_history_infos", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: { type: Sequelize.INTEGER, allowNull: true },
      userId: { type: Sequelize.INTEGER, allowNull: true },
      startDate: { type: Sequelize.DATE, allowNull: true },
      endDate: { type: Sequelize.DATE, allowNull: true },
      positionOnProject: { type: Sequelize.TEXT("long") },
      responsibility: { type: Sequelize.TEXT("long") },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.createTable("project_technologies", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "project_technologies_technologyId_projectId_unique",
      },
      technologyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "project_technologies_technologyId_projectId_unique",
      },
    });
    await queryInterface.createTable("user_leads_project", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_leads_project_userId_projectId_unique",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_leads_project_userId_projectId_unique",
      },
    });
    await queryInterface.createTable("user_roles", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_roles_userId_roleId_unique",
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_roles_userId_roleId_unique",
      },
    });
    await queryInterface.createTable("user_technologies", {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_technologies_userId_technologyId_unique",
      },
      technologyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: "user_technologies_userId_technologyId_unique",
      },
    });
    await queryInterface.addConstraint("attachments", {
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["publisherId"],
      type: "foreign key",
      name: "fk_attachments_publisherId_users",
    });
    await queryInterface.addConstraint("attachments", {
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_attachments_userId_users",
    });
    await queryInterface.addConstraint("attachments", {
      references: { table: "projects", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["projectId"],
      type: "foreign key",
      name: "fk_attachments_projectId_projects",
    });
    await queryInterface.addConstraint("attachments", {
      references: { table: "work_history_infos", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["workHistoryInfoId"],
      type: "foreign key",
      name: "fk_attachments_workHistoryInfoId_work_history_infos",
    });
    await queryInterface.addConstraint("attachments", {
      references: { table: "files", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["attachmentId"],
      type: "foreign key",
      name: "fk_attachments_attachmentId_files",
    });
    await queryInterface.addConstraint("education-infos", {
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_education-infos_userId_users",
    });
    await queryInterface.addConstraint("projects", {
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_projects_userId_users",
    });
    await queryInterface.addConstraint("projects", {
      references: { table: "clients", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["clientId"],
      type: "foreign key",
      name: "fk_projects_clientId_clients",
    });
    await queryInterface.addConstraint("tokens", {
      references: { table: "users", field: "id" },
      onDelete: "NO ACTION",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_tokens_userId_users",
    });
    await queryInterface.addConstraint("users", {
      references: { table: "files", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["cvId"],
      type: "foreign key",
      name: "fk_users_cvId_files",
    });
    await queryInterface.addConstraint("users", {
      references: { table: "work_types", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["workTypeId"],
      type: "foreign key",
      name: "fk_users_workTypeId_work_types",
    });
    await queryInterface.addConstraint("work_history_infos", {
      references: { table: "projects", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["projectId"],
      type: "foreign key",
      name: "fk_work_history_infos_projectId_projects",
    });
    await queryInterface.addConstraint("work_history_infos", {
      references: { table: "users", field: "id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_work_history_infos_userId_users",
    });
    await queryInterface.addConstraint("project_technologies", {
      references: { table: "projects", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["projectId"],
      type: "foreign key",
      name: "fk_project_technologies_projectId_projects",
    });
    await queryInterface.addConstraint("project_technologies", {
      references: { table: "technologies", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["technologyId"],
      type: "foreign key",
      name: "fk_project_technologies_technologyId_technologies",
    });
    await queryInterface.addConstraint("user_leads_project", {
      references: { table: "projects", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["projectId"],
      type: "foreign key",
      name: "fk_user_leads_project_projectId_projects",
    });
    await queryInterface.addConstraint("user_leads_project", {
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_user_leads_project_userId_users",
    });
    await queryInterface.addConstraint("user_roles", {
      references: { table: "roles", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["roleId"],
      type: "foreign key",
      name: "fk_user_roles_roleId_roles",
    });
    await queryInterface.addConstraint("user_roles", {
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_user_roles_userId_users",
    });
    await queryInterface.addConstraint("user_technologies", {
      references: { table: "users", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["userId"],
      type: "foreign key",
      name: "fk_user_technologies_userId_users",
    });
    await queryInterface.addConstraint("user_technologies", {
      references: { table: "technologies", field: "id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      fields: ["technologyId"],
      type: "foreign key",
      name: "fk_user_technologies_technologyId_technologies",
    });
    await queryInterface.addConstraint("project_technologies", {
      type: "unique",
      name: "project_technologies_technologyId_projectId_unique",
      fields: ["projectId", "technologyId"],
    });
    await queryInterface.addConstraint("user_leads_project", {
      type: "unique",
      name: "user_leads_project_userId_projectId_unique",
      fields: ["projectId", "userId"],
    });
    await queryInterface.addConstraint("user_roles", {
      type: "unique",
      name: "user_roles_userId_roleId_unique",
      fields: ["roleId", "userId"],
    });
    await queryInterface.addConstraint("user_technologies", {
      type: "unique",
      name: "user_technologies_userId_technologyId_unique",
      fields: ["userId", "technologyId"],
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "project_technologies",
      "project_technologies_technologyId_projectId_unique"
    );
    await queryInterface.removeConstraint(
      "user_leads_project",
      "user_leads_project_userId_projectId_unique"
    );
    await queryInterface.removeConstraint(
      "user_roles",
      "user_roles_userId_roleId_unique"
    );
    await queryInterface.removeConstraint(
      "user_technologies",
      "user_technologies_userId_technologyId_unique"
    );
    await queryInterface.removeConstraint(
      "attachments",
      "fk_attachments_publisherId_users"
    );
    await queryInterface.removeConstraint(
      "attachments",
      "fk_attachments_userId_users"
    );
    await queryInterface.removeConstraint(
      "attachments",
      "fk_attachments_projectId_projects"
    );
    await queryInterface.removeConstraint(
      "attachments",
      "fk_attachments_workHistoryInfoId_work_history_infos"
    );
    await queryInterface.removeConstraint(
      "attachments",
      "fk_attachments_attachmentId_files"
    );
    await queryInterface.removeConstraint(
      "education-infos",
      "fk_education-infos_userId_users"
    );
    await queryInterface.removeConstraint(
      "projects",
      "fk_projects_userId_users"
    );
    await queryInterface.removeConstraint(
      "projects",
      "fk_projects_clientId_clients"
    );
    await queryInterface.removeConstraint("tokens", "fk_tokens_userId_users");
    await queryInterface.removeConstraint("users", "fk_users_cvId_files");
    await queryInterface.removeConstraint(
      "users",
      "fk_users_workTypeId_work_types"
    );
    await queryInterface.removeConstraint(
      "work_history_infos",
      "fk_work_history_infos_projectId_projects"
    );
    await queryInterface.removeConstraint(
      "work_history_infos",
      "fk_work_history_infos_userId_users"
    );
    await queryInterface.removeConstraint(
      "project_technologies",
      "fk_project_technologies_projectId_projects"
    );
    await queryInterface.removeConstraint(
      "project_technologies",
      "fk_project_technologies_technologyId_technologies"
    );
    await queryInterface.removeConstraint(
      "user_leads_project",
      "fk_user_leads_project_projectId_projects"
    );
    await queryInterface.removeConstraint(
      "user_leads_project",
      "fk_user_leads_project_userId_users"
    );
    await queryInterface.removeConstraint(
      "user_roles",
      "fk_user_roles_roleId_roles"
    );
    await queryInterface.removeConstraint(
      "user_roles",
      "fk_user_roles_userId_users"
    );
    await queryInterface.removeConstraint(
      "user_technologies",
      "fk_user_technologies_userId_users"
    );
    await queryInterface.removeConstraint(
      "user_technologies",
      "fk_user_technologies_technologyId_technologies"
    );
    await queryInterface.dropTable("allowed_registration_email");
    await queryInterface.dropTable("attachments");
    await queryInterface.dropTable("clients");
    await queryInterface.dropTable("education-infos");
    await queryInterface.dropTable("files");
    await queryInterface.dropTable("projects");
    await queryInterface.dropTable("roles");
    await queryInterface.dropTable("work_types");
    await queryInterface.dropTable("technologies");
    await queryInterface.dropTable("tokens");
    await queryInterface.dropTable("users");
    await queryInterface.dropTable("work_history_infos");
    await queryInterface.dropTable("project_technologies");
    await queryInterface.dropTable("user_leads_project");
    await queryInterface.dropTable("user_roles");
    await queryInterface.dropTable("user_technologies");
  },
};
