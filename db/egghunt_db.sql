USE [master]
GO
/****** Object:  Database [DB_A37872_egghunt]    Script Date: 4/9/2018 8:13:31 AM ******/
CREATE DATABASE [DB_A37872_egghunt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DB_A37872_egghunt_Data', FILENAME = N'H:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\DB_A37872_egghunt_DATA.mdf' , SIZE = 4096KB , MAXSIZE = 102400KB , FILEGROWTH = 10%)
 LOG ON 
( NAME = N'DB_A37872_egghunt_Log', FILENAME = N'H:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\DB_A37872_egghunt_Log.LDF' , SIZE = 3072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [DB_A37872_egghunt] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DB_A37872_egghunt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DB_A37872_egghunt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET ARITHABORT OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DB_A37872_egghunt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DB_A37872_egghunt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET  ENABLE_BROKER 
GO
ALTER DATABASE [DB_A37872_egghunt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DB_A37872_egghunt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DB_A37872_egghunt] SET  MULTI_USER 
GO
ALTER DATABASE [DB_A37872_egghunt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DB_A37872_egghunt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DB_A37872_egghunt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DB_A37872_egghunt] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [DB_A37872_egghunt] SET DELAYED_DURABILITY = DISABLED 
GO
USE [DB_A37872_egghunt]
GO
/****** Object:  Schema [action]    Script Date: 4/9/2018 8:13:33 AM ******/
CREATE SCHEMA [action]
GO
/****** Object:  Table [dbo].[Count]    Script Date: 4/9/2018 8:13:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Count](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[GroupName] [nvarchar](100) NOT NULL,
	[Value] [int] NOT NULL,
 CONSTRAINT [PK_Count] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Login]    Script Date: 4/9/2018 8:13:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[PassCode] [nvarchar](500) NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Count] ON 

INSERT [dbo].[Count] ([Id], [GroupName], [Value]) VALUES (1, N'GroupA', 106)
INSERT [dbo].[Count] ([Id], [GroupName], [Value]) VALUES (2, N'GroupB', 106)
INSERT [dbo].[Count] ([Id], [GroupName], [Value]) VALUES (3, N'GroupC', 72)
SET IDENTITY_INSERT [dbo].[Count] OFF
ALTER TABLE [dbo].[Count] ADD  CONSTRAINT [DF_Count_Value]  DEFAULT ((0)) FOR [Value]
GO
/****** Object:  StoredProcedure [action].[decrement]    Script Date: 4/9/2018 8:13:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Lui, Hon
-- Create date: 20180317
-- Description:	Decrement the counter for the group specified
-- =============================================
CREATE PROCEDURE [action].[decrement]	
	@GroupName varchar(50)
AS
BEGIN	
	SET NOCOUNT ON;
	
	UPDATE [dbo].[Count]
	SET [Value] = CASE WHEN 1 > [Value] THEN 0 ELSE [Value] - 1 END
	WHERE [GroupName] = @GroupName
		
END


GO
/****** Object:  StoredProcedure [action].[Increment]    Script Date: 4/9/2018 8:13:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Lui, Hon
-- Create date: 20180317
-- Description:	Increment the counter for the group specified
-- =============================================
CREATE PROCEDURE [action].[Increment]	
	@GroupName varchar(50)
AS
BEGIN	
	SET NOCOUNT ON;
	
	UPDATE [dbo].[Count]
	SET [Value] = [Value] + 1
	WHERE [GroupName] = @GroupName
		
END

GO
USE [master]
GO
ALTER DATABASE [DB_A37872_egghunt] SET  READ_WRITE 
GO
